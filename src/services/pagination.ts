/** Read complete collections despite the Data API's per-request row limit. */
export async function collectPages<T>(load: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: unknown }>, size = 500): Promise<T[]> {
  const rows: T[] = [];
  for (let offset = 0; ; offset += size) {
    const { data, error } = await load(offset, offset + size - 1);
    if (error) throw error;
    const batch = data ?? [];
    rows.push(...batch);
    if (batch.length < size) return rows;
  }
}
