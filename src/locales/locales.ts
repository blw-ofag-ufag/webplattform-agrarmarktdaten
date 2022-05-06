// If translations get too big, we should load them dynamically. But for now it's fine.
import { i18n } from "@lingui/core";
import {
  de as pluralsDe,
  en as pluralsEn,
  fr as pluralsFr,
  it as pluralsIt,
} from "make-plural/plurals";

import { messages as catalogDe } from "@/locales/de/messages.js";
import { messages as catalogEn } from "@/locales/en/messages.js";
import { messages as catalogFr } from "@/locales/fr/messages.js";
import { messages as catalogIt } from "@/locales/it/messages.js";

export const defaultLocale = "de";

// The order specified here will determine the fallback order when strings are not available in the preferred language
export const locales = ["de", "fr", "it", "en"] as const;

export type Locale = typeof locales[number];

i18n.loadLocaleData({
  de: { plurals: pluralsDe },
  fr: { plurals: pluralsFr },
  it: { plurals: pluralsIt },
  en: { plurals: pluralsEn },
});
i18n.load({
  de: catalogDe,
  fr: catalogFr,
  it: catalogIt,
  en: catalogEn,
});
i18n.activate(defaultLocale);

export { i18n };

/**
 * Parses a valid app locale from a locale string (e.g. a Accept-Language header).
 * If unparseable, returns default locale.
 * @param localeString locale string, e.g. de,en-US;q=0.7,en;q=0.3
 */
export const parseLocaleString = (localeString: string): Locale => {
  const result = /^(de|fr|it|en)/.exec(localeString);
  return result ? (result[1] as Locale) : defaultLocale;
};
