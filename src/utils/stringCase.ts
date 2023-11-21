type KebabCase<S extends string> = S extends `${infer T}${infer U}`
  ? U extends Uncapitalize<U>
    ? `${Uncapitalize<T>}${KebabCase<U>}`
    : `${Uncapitalize<T>}-${KebabCase<U>}`
  : S;

export const toKebabCase = <T extends string>(v: T) =>
  v.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`) as KebabCase<T>;

export const toCamelCase = (v: string) => v.replace(/-./g, (x) => x[1].toUpperCase());
