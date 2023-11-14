import { parseLocaleString, defaultLocale } from "@/locales/locales";

export type SortBy = SortByEn | SortByDe | SortByFr | SortByIt;

//NOTE: there is probably a better way to do get the translations and not hard code them here
enum SortByDe {
  publishedDate_DESC = "Neuste",
  publishedDate_ASC = "Älteste",
}

enum SortByEn {
  publishedDate_DESC = "Newest",
  publishedDate_ASC = "Oldest",
}

enum SortByFr {
  publishedDate_DESC = "Plus récent",
  publishedDate_ASC = "Plus vieux",
}

enum SortByIt {
  publishedDate_DESC = "Più recente",
  publishedDate_ASC = "Più vecchio",
}

export const getSortBy = (locale?: string) => {
  const validLocale = parseLocaleString(locale ?? defaultLocale);
  return {
    en: SortByEn,
    de: SortByDe,
    fr: SortByFr,
    it: SortByIt,
  }[validLocale];
};
