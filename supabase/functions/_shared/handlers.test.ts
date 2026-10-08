import { beforeEach, expect, it, vi } from 'vitest';
import type { SupabaseClient } from '@supabase/supabase-js';
import { createHandler } from './handlers';
const id = '11111111-1111-4111-8111-111111111111';
const getUser = vi.fn();
const query: Record<string, ReturnType<typeof vi.fn>> = {};
const responses: { data: unknown; error: unknown }[] = [];
for (const name of ['select','eq','maybeSingle','single','insert','update']) query[name] = vi.fn(() => query);
query.then = vi.fn(resolve => Promise.resolve(responses.shift()).then(resolve));
const client = { auth: { getUser }, from: vi.fn(() => query) } as unknown as SupabaseClient;
const clientFor = vi.fn(() => client);
const request = (body: unknown, token = 'Bearer token') => new Request('https://example.test', { method: 'POST', headers: { Authorization: token }, body: JSON.stringify(body) });
beforeEach(() => { vi.clearAllMocks(); responses.length = 0; getUser.mockResolvedValue({ data: { user: { id } }, error: null }); });
it('handles preflight and rejects unsupported methods without touching the database', async () => {
  const handler = createHandler('score', clientFor);
  expect((await handler(new Request('https://example.test', { method: 'OPTIONS' }))).status).toBe(204);
  expect((await handler(new Request('https://example.test'))).status).toBe(405);
  expect(clientFor).not.toHaveBeenCalled();
});
it('requires a bearer token and an authenticated user', async () => {
  const handler = createHandler('score', clientFor);
  expect((await handler(request({}, ''))).status).toBe(401);
  getUser.mockResolvedValue({ data: { user: null }, error: null });
  expect((await handler(request({}))).status).toBe(401);
  expect(client.from).not.toHaveBeenCalled();
});
it.each([null, [], {}, { opportunityId: 'bad' }])('rejects invalid scoring input %s', async input => {
  expect((await createHandler('score', clientFor)(request(input))).status).toBe(400);
});
it('does not return or update another user’s opportunity', async () => {
  responses.push({ data: null, error: null });
  expect((await createHandler('score', clientFor)(request({ opportunityId: id }))).status).toBe(404);
  expect(query.eq).toHaveBeenCalledWith('user_id', id);
  expect(query.update).not.toHaveBeenCalled();
});
it('does not report success when saving the score fails', async () => {
  responses.push({ data: { deadline: '2099-01-01', value: 100 }, error: null }, { data: null, error: new Error('secret database detail') });
  const response = await createHandler('score', clientFor)(request({ opportunityId: id }));
  expect(response.status).toBe(500);
  expect(await response.text()).not.toContain('secret database detail');
});
it('returns a saved heuristic score', async () => {
  responses.push({ data: { deadline: '2099-01-01', value: 100 }, error: null }, { data: { id }, error: null });
  const response = await createHandler('score', clientFor)(request({ opportunityId: id }));
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ score: 80 });
});
const opportunity = { title: 'Work', description: 'Design', agency: 'Agency', solicitation_number: '123', value: 10, deadline: '2027-01-01', category: 'Services' };
it('rejects mass assignment of ownership or scoring fields', async () => {
  expect((await createHandler('create', clientFor)(request({ ...opportunity, user_id: 'other' }))).status).toBe(400);
  expect(query.insert).not.toHaveBeenCalled();
});
it('derives ownership from the verified user when creating', async () => {
  responses.push({ data: { id }, error: null });
  expect((await createHandler('create', clientFor)(request(opportunity))).status).toBe(201);
  expect(query.insert).toHaveBeenCalledWith([expect.objectContaining({ user_id: id, status: 'open', winnability_score: 0 })]);
});
it('rejects malformed JSON and oversized requests', async () => {
  const handler = createHandler('create', clientFor);
  expect((await handler(new Request('https://example.test', { method: 'POST', headers: { Authorization: 'Bearer token' }, body: '{' }))).status).toBe(400);
  expect((await handler(request({ title: 'a'.repeat(17000) }))).status).toBe(413);
});
