// @vitest-environment jsdom
import { beforeEach, expect, it, vi } from 'vitest';
import { OpportunityService, TaskService, QuoteService } from './services';
import { DEMO_USER_ID, DEMO_OPPORTUNITY_ID } from './fixtures';
import { readDemo, resetDemo, writeDemo } from './store';
beforeEach(() => { sessionStorage.clear(); resetDemo(); });
it('creates a complete local workflow without fetch', async () => {
  const fetch = vi.spyOn(globalThis, 'fetch');
  try {
    const opportunity = await OpportunityService.create(DEMO_USER_ID, { title: 'Test response', description: 'Example', agency: 'Example team', category: 'IT', solicitationNumber: 'DEMO-NEW', value: 200, deadline: '2027-01-01' });
    const pack = await TaskService.createTaskPack(opportunity.id, 'Proposal');
    const task = await TaskService.create({ opportunityId: opportunity.id, taskPackId: pack.id, title: 'Write proposal', priority: 'high' });
    expect((await TaskService.update(task.id, { status: 'completed' })).completedAt).toBeTruthy();
    expect((await TaskService.update(task.id, { status: 'pending' })).completedAt).toBeNull();
    const quote = await QuoteService.create(DEMO_USER_ID, { opportunityId: opportunity.id, title: 'Estimate', lineItems: [{ description: 'Hours', quantity: 3, unitPrice: 12.5, total: 999 }], taxRate: 0.1 });
    expect(quote.total).toBe(41.25);
    const updated = await QuoteService.update(quote.id, { taxRate: 0.2 }, 1);
    expect(updated.total).toBe(45);
    await expect(QuoteService.update(quote.id, { title: 'Stale' }, 1)).rejects.toThrow('Quote changed');
    await OpportunityService.update(opportunity.id, { status: 'won' });
    expect((await OpportunityService.getById(opportunity.id))?.status).toBe('won');
    expect(fetch).not.toHaveBeenCalled();
  } finally { fetch.mockRestore(); }
});
it('keeps parent constraints and calculation validation in demo mode', async () => {
  await expect(TaskService.create({ opportunityId: DEMO_OPPORTUNITY_ID, taskPackId: 'missing', title: 'Task', priority: 'medium' })).rejects.toThrow('Task pack not found');
  const quote = readDemo().quotes[0];
  await expect(QuoteService.update(quote.id, { taxRate: -1 }, quote.version)).rejects.toThrow();
  expect(readDemo().quotes[0]).toEqual(quote);
});
it('clones read results and resets all local changes', async () => {
  const state = readDemo(); state.opportunities[0].title = 'Changed';
  expect(readDemo().opportunities[0].title).not.toBe('Changed');
  writeDemo(state); expect(readDemo().opportunities[0].title).toBe('Changed');
  resetDemo(); expect(readDemo().opportunities[0].title).not.toBe('Changed');
});
it('filters and pages demo opportunities and handles empty results', async () => {
  expect((await OpportunityService.getPage(DEMO_USER_ID, 0, 'does not exist')).items).toEqual([]);
  const page = await OpportunityService.getPage(DEMO_USER_ID, 0, 'library', 'open');
  expect(page.items).toHaveLength(1);
  expect(page.items[0].title).toContain('Library');
});
it('restores saved state after module reload and recovers from blocked storage', async () => {
  const state = readDemo(); state.profile.full_name = 'Saved locally'; writeDemo(state);
  vi.resetModules();
  const restored = await import('./store');
  expect(restored.readDemo().profile.full_name).toBe('Saved locally');
  vi.resetModules();
  const getter = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Storage blocked'); });
  try {
    const fallback = await import('./store');
    expect(fallback.readDemo().opportunities.length).toBeGreaterThan(0);
    expect(fallback.demoStorageAvailable()).toBe(false);
  } finally { getter.mockRestore(); }
});
