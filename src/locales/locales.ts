// If translations get too big, we should load them dynamically. But for now it's fine.
import { i18n } from "@lingui/core";
import { de as pluralsDe, fr as pluralsFr, it as pluralsIt } from "make-plural/plurals";

import { messages as catalogDe } from "@/locales/de/messages.js";
import { messages as catalogFr } from "@/locales/fr/messages.js";
import { messages as catalogIt } from "@/locales/it/messages.js";

// The order specified here will determine the fallback order when strings are not available in the preferred language
export const locales = ["de", "fr", "it" /* "en" */];
export type Locale = (typeof locales)[number];

export const defaultLocale = "de" as Locale;

export const isValidLocale = (maybeLocale: string | undefined | null): maybeLocale is Locale => {
  if (!maybeLocale) {
    return false;
  }
  return locales.includes(maybeLocale as Locale);
};

i18n.loadLocaleData({
  de: { plurals: pluralsDe },
  fr: { plurals: pluralsFr },
  it: { plurals: pluralsIt },
});
i18n.load({
  de: catalogDe,
  fr: catalogFr,
  it: catalogIt,
});
i18n.activate(defaultLocale);

export { i18n };

/**
 * Parses a valid app locale from a locale string (e.g. a Accept-Language header).
 * If unparseable, returns default locale.
 * @param localeString locale string, e.g. de,en-US;q=0.7,en;q=0.3
 */
export const parseLocaleString = (localeString: string): Locale => {
  const result = /^(de|fr|it)/.exec(localeString);
  return result ? (result[1] as Locale) : defaultLocale;
};
