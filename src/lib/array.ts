export function dedupById<T extends { id: any }>(a: T[], b: T[]): T[] {
  const idSet = new Set(a.map(({ id }) => id));
  const unique = b.filter(({ id }) => !idSet.has(id));
  return [...a, ...unique];
}
