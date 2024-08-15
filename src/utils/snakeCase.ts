export function snakeCase(dataKey: string): string {
  return dataKey.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}
