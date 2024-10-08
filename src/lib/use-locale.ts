import { defaultLocale, Locale, locales } from "@/locales/locales";
import { atom, useAtomValue } from "jotai";
import { atomWithLocation } from "jotai-location";
import { Router } from "next/router";
import routeLocales from "@/locales/locales.json";
import { match } from "ts-pattern";

const locationAtom = atomWithLocation({
  // Needed to make sure atom is synced with Next.js router
  // https://github.com/pmndrs/jotai/issues/485#issuecomment-936215117
  subscribe: (callback) => {
    Router.events.on("routeChangeComplete", callback); // Subscribe to next router
    return () => {
      Router.events.off("routeChangeComplete", callback); // Unsubscribe to next router
    };
  },
  getLocation: () => {
    if (typeof window === "undefined") return {};
    return {
      pathname: window.location.pathname,
      host: window.location.host,
      hostname: window.location.hostname,
      search: window.location.search,
    };
  },
});

export const localeAtom = atom<Locale>((get) => {
  const location = get(locationAtom);
  const localizedHosts = match(process.env.NEXT_PUBLIC_VERCEL_ENV)
    .with("development", () => routeLocales.localDomains)
    .with("preview", () => routeLocales.previewDomains)
    .with("production", () => routeLocales.domains)
    .otherwise(() => routeLocales.domains);

  // @ts-ignore location is enriched with hostname by atomWithLocation
  const locale = localizedHosts.find((host) => host.domain === location?.hostname)?.defaultLocale;
  if (locale && locales.includes(locale as Locale)) return locale as Locale;

  // Check if locale is in sub route
  const localeInPath = location.pathname?.split("/")[1];
  if (locales.includes(localeInPath as Locale)) return localeInPath as Locale;

  // Fall back to default locale
  return defaultLocale;
});

export const useLocale = () => {
  return useAtomValue(localeAtom);
};
