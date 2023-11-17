export const toKebabCase = (v: string) =>
  v.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

export const toCamelCase = (v: string) => v.replace(/-./g, (x) => x[1].toUpperCase());
