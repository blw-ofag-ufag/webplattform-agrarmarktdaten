import { defaultLocale, Locale, locales } from "@/locales/locales";
import { atom, useAtomValue } from "jotai";
import { atomWithLocation } from "jotai-location";

const locationAtom = atomWithLocation();

export const localeAtom = atom<Locale>((get) => {
  const location = get(locationAtom);
  const locale = location.pathname?.split("/")[1];
  if (locale && locales.includes(locale as Locale)) return locale as Locale;
  return defaultLocale;
});

export const useLocale = () => {
  return useAtomValue(localeAtom);
};
