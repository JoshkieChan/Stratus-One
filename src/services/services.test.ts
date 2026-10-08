import { beforeEach, expect, it, vi } from 'vitest';
const { query, client, responses } = vi.hoisted(() => {
  const responses: { data: unknown; error: unknown }[] = [];
  const query: Record<string, ReturnType<typeof vi.fn>> = {};
  for (const key of ['select','eq','order','insert','update','delete','single','maybeSingle','range','or']) query[key] = vi.fn(() => query);
  query.then = vi.fn((resolve) => Promise.resolve(responses.shift() ?? { data: null, error: null }).then(resolve));
  return { responses, query, client: { from: vi.fn(() => query), functions: { invoke: vi.fn() } } };
});
vi.mock('../lib/supabaseClient', () => ({ supabase: client }));
import { QuoteService } from './QuoteService';
import { TaskService } from './TaskService';
import { OpportunityService } from './OpportunityService';
const id = '11111111-1111-4111-8111-111111111111';
beforeEach(() => { vi.clearAllMocks(); responses.length = 0; });
it('maps opportunity columns and scopes the feed to a user', async () => {
  responses.push({ data: [{ id, user_id: id, winnability_score: 70 }], error: null });
  expect(await OpportunityService.getAll(id)).toEqual([{ id, userId: id, winnabilityScore: 70 }]);
  expect(query.eq).toHaveBeenCalledWith('user_id', id);
});
it('returns null for a missing opportunity and propagates database failures', async () => {
  expect(await OpportunityService.getById(id)).toBeNull();
  responses.push({ data: null, error: new Error('Denied') });
  await expect(OpportunityService.getAll(id)).rejects.toThrow('Denied');
});
it('recomputes caller-supplied quote totals and serializes database columns', async () => {
  responses.push({ data: { id, tax_amount: 2 }, error: null });
  expect(await QuoteService.create(id, { title: 'Quote', opportunityId: id, taxRate: 0.1, lineItems: [{ description: 'Work', quantity: 2, unitPrice: 10, total: 999 }] })).toMatchObject({ taxAmount: 2 });
  expect(query.insert).toHaveBeenCalledWith([expect.objectContaining({ opportunity_id: id, subtotal: 20, tax_rate: 0.1, tax_amount: 2, total: 22, line_items: [expect.objectContaining({ total: 20 })] })]);
});
it('recalculates tax-only edits from existing lines', async () => {
  responses.push({ data: { version: 1, line_items: [{ quantity: 2, unitPrice: 10 }], tax_rate: 0.1 }, error: null }, { data: { id }, error: null });
  await QuoteService.update(id, { taxRate: 0.2 }, 1);
  expect(query.update).toHaveBeenCalledWith(expect.objectContaining({ subtotal: 20, total: 24, tax_amount: 4 }));
});
it('preserves existing tax on line-only edits', async () => {
  responses.push({ data: { version: 1, line_items: [], tax_rate: 0.1 }, error: null }, { data: { id }, error: null });
  await QuoteService.update(id, { lineItems: [{ description: 'Work', quantity: 1, unitPrice: 10, total: 0 }] }, 1);
  expect(query.update).toHaveBeenCalledWith(expect.objectContaining({ total: 11, tax_rate: 0.1 }));
});
it('rejects invalid quotes before writing and does not fake PDF generation', async () => {
  await expect(QuoteService.create(id, { title: '', opportunityId: id, lineItems: [] })).rejects.toThrow();
  expect(query.insert).not.toHaveBeenCalled();
  await expect(QuoteService.generatePDF(id)).rejects.toThrow('not implemented');
});
it('clears completion timestamps when a task is reopened', async () => {
  responses.push({ data: { id, completed_at: null, status: 'in_progress' }, error: null });
  expect(await TaskService.update(id, { status: 'in_progress' })).toMatchObject({ completedAt: null });
  expect(query.update).toHaveBeenCalledWith({ status: 'in_progress', completed_at: null });
});
it('sets a completion timestamp and maps nested task packs', async () => {
  responses.push({ data: { id }, error: null }, { data: [{ opportunity_id: id, tasks: [{ due_date: '2026-01-01' }] }], error: null });
  await TaskService.update(id, { status: 'completed' });
  expect(query.update).toHaveBeenCalledWith({ status: 'completed', completed_at: expect.any(String) });
  expect(await TaskService.getTaskPacks(id)).toEqual([{ opportunityId: id, tasks: [{ dueDate: '2026-01-01' }] }]);
});
it('rejects malformed scoring responses', async () => {
  client.functions.invoke.mockResolvedValue({ data: { score: '99' }, error: null });
  await expect(OpportunityService.calculateWinnability(id)).rejects.toThrow('Invalid scoring response');
});
it('rejects invalid opportunity edits and empty task names before writing', async () => {
  await expect(OpportunityService.update(id, { deadline: 'invalid' })).rejects.toThrow('Invalid deadline');
  await expect(OpportunityService.update(id, { value: -1 })).rejects.toThrow('non-negative');
  await expect(TaskService.createTaskPack(id, ' ')).rejects.toThrow();
  expect(query.update).not.toHaveBeenCalled();
  expect(query.insert).not.toHaveBeenCalled();
});

it('refuses stale quote versions before overwriting newer calculations', async () => {
  responses.push({ data: { version: 2 }, error: null });
  await expect(QuoteService.update(id, { taxRate: 0.1 }, 1)).rejects.toThrow('Quote changed');
  expect(query.update).not.toHaveBeenCalled();
});
it('guards the write atomically and reports a concurrent change', async () => {
  responses.push({ data: null, error: null });
  await expect(QuoteService.update(id, { title: 'Edited' }, 1)).rejects.toThrow('Quote changed');
  expect(query.eq).toHaveBeenCalledWith('version', 1);
});

it('paginates with deterministic ordering and safely quoted search filters', async () => {
  responses.push({ data: [], error: null });
  await OpportunityService.getPage(id, 2, 'Bid, "quoted"_%', 'open');
  expect(query.range).toHaveBeenCalledWith(48, 71);
  expect(query.eq).toHaveBeenCalledWith('status', 'open');
  expect(query.order).toHaveBeenCalledWith('id');
  expect(query.or).toHaveBeenCalledWith('title.ilike."%Bid, \\"quoted\\"\\_\\%%",agency.ilike."%Bid, \\"quoted\\"\\_\\%%"'.replaceAll('\\\\"', '\\"'));
});
it('rejects invalid page numbers without querying Supabase', async () => {
  await expect(OpportunityService.getPage(id, -1)).rejects.toThrow('Invalid page');
  expect(client.from).not.toHaveBeenCalled();
});
