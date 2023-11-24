import { defaultLocale, Locale, locales } from "@/locales/locales";
import { atom, useAtomValue } from "jotai";
import { atomWithLocation } from "jotai-location";
import { Router } from "next/router";

const locationAtom = atomWithLocation({
  // Needed to make sure atom is synced with Next.js router
  // https://github.com/pmndrs/jotai/issues/485#issuecomment-936215117
  subscribe: (callback) => {
    Router.events.on("routeChangeComplete", callback); // Subscribe to next router
    return () => {
      Router.events.off("routeChangeComplete", callback); // Unsubscribe to next router
    };
  },
});

export const localeAtom = atom<Locale>((get) => {
  const location = get(locationAtom);
  const locale = location.pathname?.split("/")[1];
  if (locale && locales.includes(locale as Locale)) return locale as Locale;
  return defaultLocale;
});

export const useLocale = () => {
  return useAtomValue(localeAtom);
};
