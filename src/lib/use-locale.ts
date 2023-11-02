import { defaultLocale, Locale } from "@/locales/locales";
import { atom, useAtomValue } from "jotai";

export const localeAtom = atom<Locale>(defaultLocale);

export const useLocale = () => {
  return useAtomValue(localeAtom);
};
