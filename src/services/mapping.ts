type Snake<S extends string> = S extends `${infer H}${infer T}` ? `${H extends Lowercase<H> ? H : `_${Lowercase<H>}`}${Snake<T>}` : S;
export type DatabaseRow<T> = { [K in keyof T as K extends string ? Snake<K> : K]: T[K] };

/** Top-level columns only: JSON line_items intentionally retain their domain keys. */
export function toRow<T extends object>(input: T): DatabaseRow<T> {
  return Object.fromEntries(Object.entries(input).filter(([,v]) => v !== undefined).map(([k,v]) => [k.replace(/[A-Z]/g,c=>'_'+c.toLowerCase()),v])) as DatabaseRow<T>;
}
export function fromRow<T>(row: unknown): T {
  if (!row || typeof row !== 'object' || Array.isArray(row)) throw new Error('Invalid database response');
  return Object.fromEntries(Object.entries(row).map(([k,v]) => [k.replace(/_([a-z])/g,(_,c: string)=>c.toUpperCase()),v])) as T;
}
