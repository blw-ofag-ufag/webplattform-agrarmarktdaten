// TODO Reactivate when we have a Regex that works on Safari iOS.
// See also the spec file where the test is skipped.
// const BIGNUMBER_SPACE_REGEX = /(?<=\b\d{1,3})\s(?=\d{1,3}\b)/g;
// export const replaceNumberSeparators = (string: string) => string.replace(BIGNUMBER_SPACE_REGEX, "\u00A0");
export const replaceNumberSeparators = (string: string) => string;

export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
};
