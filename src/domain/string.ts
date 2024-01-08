const BIGNUMBER_SPACE_REGEX = /(?<=\b\d{1,3})\s(?=\d{1,3}\b)/g;
export const replaceNumberSeparators = (string: string) =>
  string.replace(BIGNUMBER_SPACE_REGEX, "\u00A0");

export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
};
