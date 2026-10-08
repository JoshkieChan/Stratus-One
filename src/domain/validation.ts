export function requireTitle(title: unknown): asserts title is string {
  if (typeof title !== 'string' || !title.trim() || title.length > 500) throw new Error('A title of 1–500 characters is required');
}
export function requireId(id: unknown): asserts id is string {
  if (typeof id !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) throw new Error('A valid UUID is required');
}

export function validateOpportunity(input: { title?: string; value?: number; deadline?: string }) {
  if (input.title !== undefined) requireTitle(input.title);
  if (input.value !== undefined && (!Number.isFinite(input.value) || input.value < 0)) throw new Error('Opportunity value must be non-negative');
  if (input.deadline !== undefined && !Number.isFinite(Date.parse(input.deadline))) throw new Error('Invalid deadline');
}
