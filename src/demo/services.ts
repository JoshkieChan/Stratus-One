import { readDemo, writeDemo } from './store';
import { calculateQuote } from '../domain/quotes';
import { calculateWinnability } from '../domain/winnability';
import { requireTitle, validateOpportunity } from '../domain/validation';
import type { Opportunity, OpportunityCreateInput, OpportunityUpdateInput } from '../types/opportunity';
import type { Task, TaskCreateInput, TaskUpdateInput, TaskPack } from '../types/task';
import type { Quote, QuoteCreateInput, QuoteUpdateInput } from '../types/quote';
const now = () => new Date().toISOString();
function ownedOpportunity(id: string) {
  const opportunity = readDemo().opportunities.find(item => item.id === id);
  if (!opportunity) throw new Error('Opportunity not found. Select an opportunity from the feed.');
  return opportunity;
}
export class OpportunityService {
  static async getAll(userId: string): Promise<Opportunity[]> { return readDemo().opportunities.filter(item => item.userId === userId); }
  static async getPage(userId: string, page = 0, search = '', status = 'all') {
    if (!Number.isSafeInteger(page) || page < 0) throw new Error('Invalid page');
    const needle = search.trim().toLowerCase();
    const matches = (await this.getAll(userId)).filter(item => (status === 'all' || item.status === status) && `${item.title} ${item.agency}`.toLowerCase().includes(needle));
    return { items: matches.slice(page * 24, (page + 1) * 24), total: matches.length, pageSize: 24 };
  }
  static async getById(id: string): Promise<Opportunity | null> { return readDemo().opportunities.find(item => item.id === id) ?? null; }
  static async create(userId: string, input: OpportunityCreateInput): Promise<Opportunity> {
    requireTitle(input.title); validateOpportunity(input);
    const record: Opportunity = { ...input, id: crypto.randomUUID(), userId, status: 'open', winnabilityScore: 0, createdAt: now(), updatedAt: now() };
    const state = readDemo(); state.opportunities.unshift(record); writeDemo(state); return record;
  }
  static async update(id: string, input: OpportunityUpdateInput): Promise<Opportunity> {
    validateOpportunity(input); const record = { ...ownedOpportunity(id), ...input, updatedAt: now() };
    const state = readDemo(); state.opportunities = state.opportunities.map(item => item.id === id ? record : item); writeDemo(state); return record;
  }
  static async delete(id: string) {
    const state = readDemo(); state.opportunities = state.opportunities.filter(item => item.id !== id);
    state.packs = state.packs.filter(item => item.opportunityId !== id); state.tasks = state.tasks.filter(item => item.opportunityId !== id); state.quotes = state.quotes.filter(item => item.opportunityId !== id); writeDemo(state);
  }
  static async calculateWinnability(id: string) { const score = calculateWinnability(ownedOpportunity(id)); await this.update(id, { winnabilityScore: score }); return score; }
}
export class TaskService {
  static async getAll(userId: string): Promise<Task[]> { const ids = new Set((await OpportunityService.getAll(userId)).map(item => item.id)); return readDemo().tasks.filter(item => ids.has(item.opportunityId)); }
  static async getByOpportunity(id: string): Promise<Task[]> { return readDemo().tasks.filter(item => item.opportunityId === id); }
  static async getById(id: string): Promise<Task | null> { return readDemo().tasks.find(item => item.id === id) ?? null; }
  static async create(input: TaskCreateInput): Promise<Task> {
    requireTitle(input.title); ownedOpportunity(input.opportunityId);
    const state = readDemo();
    if (input.taskPackId && !state.packs.some(pack => pack.id === input.taskPackId && pack.opportunityId === input.opportunityId)) throw new Error('Task pack not found');
    const record: Task = { ...input, id: crypto.randomUUID(), status: 'pending', createdAt: now(), updatedAt: now() };
    state.tasks.push(record); writeDemo(state); return record;
  }
  static async update(id: string, input: TaskUpdateInput): Promise<Task> {
    if (input.title !== undefined) requireTitle(input.title);
    const state = readDemo(); const existing = state.tasks.find(item => item.id === id); if (!existing) throw new Error('Task not found');
    const record = { ...existing, ...input, updatedAt: now() };
    record.completedAt = record.status === 'completed' ? existing.completedAt ?? now() : null;
    state.tasks = state.tasks.map(item => item.id === id ? record : item); writeDemo(state); return record;
  }
  static async delete(id: string) { const state = readDemo(); state.tasks = state.tasks.filter(item => item.id !== id); writeDemo(state); }
  static async getTaskPacks(id: string): Promise<TaskPack[]> { const state = readDemo(); return state.packs.filter(item => item.opportunityId === id).map(pack => ({ ...pack, tasks: state.tasks.filter(task => task.taskPackId === pack.id) })); }
  static async createTaskPack(opportunityId: string, name: string, description?: string): Promise<TaskPack> {
    requireTitle(name); ownedOpportunity(opportunityId); const state = readDemo();
    const record: TaskPack = { id: crypto.randomUUID(), opportunityId, name, description, status: 'active', tasks: [], createdAt: now(), updatedAt: now() };
    state.packs.push(record); writeDemo(state); return record;
  }
}
function price(input: Pick<QuoteCreateInput, 'lineItems' | 'taxRate'>) {
  if (!input.lineItems.length) throw new Error('A saved quote requires at least one line item');
  const taxRate = input.taxRate ?? 0;
  const { lineTotals, ...totals } = calculateQuote(input.lineItems, taxRate);
  return { ...totals, taxRate, lineItems: input.lineItems.map((item,index) => ({ ...item, total: lineTotals[index] })) };
}
export class QuoteService {
  static async getByOpportunity(id: string): Promise<Quote[]> { return readDemo().quotes.filter(item => item.opportunityId === id); }
  static async getById(id: string): Promise<Quote | null> { return readDemo().quotes.find(item => item.id === id) ?? null; }
  static async create(userId: string, input: QuoteCreateInput): Promise<Quote> {
    requireTitle(input.title); ownedOpportunity(input.opportunityId); const state = readDemo();
    const record: Quote = { ...input, ...price(input), id: crypto.randomUUID(), userId, quoteNumber: `DEMO-Q-${crypto.randomUUID().slice(0,8)}`, status: 'draft', version: 1, createdAt: now(), updatedAt: now() };
    state.quotes.unshift(record); writeDemo(state); return record;
  }
  static async update(id: string, input: QuoteUpdateInput, expectedVersion: number): Promise<Quote> {
    const state = readDemo(); const existing = state.quotes.find(item => item.id === id);
    if (!existing || existing.version !== expectedVersion) throw new Error('Quote changed or is no longer accessible. Reload it before saving your edits.');
    const merged = { ...existing, ...input }; requireTitle(merged.title); ownedOpportunity(merged.opportunityId);
    const record = { ...merged, ...price(merged), version: existing.version + 1, updatedAt: now() };
    state.quotes = state.quotes.map(item => item.id === id ? record : item); writeDemo(state); return record;
  }
  static async delete(id: string) { const state = readDemo(); state.quotes = state.quotes.filter(item => item.id !== id); writeDemo(state); }
}
