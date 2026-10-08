import { expect, it } from 'vitest';
import { collectPages } from './pagination';
it('reads past the API page boundary without losing records', async () => {
  const all = [1,2,3,4,5];
  expect(await collectPages(async (from,to) => ({ data: all.slice(from,to + 1), error: null }), 2)).toEqual(all);
});
it('propagates failures instead of returning partial totals', async () => {
  await expect(collectPages(async from => from === 0 ? { data: [1,2], error: null } : { data: null, error: new Error('offline') }, 2)).rejects.toThrow('offline');
});
