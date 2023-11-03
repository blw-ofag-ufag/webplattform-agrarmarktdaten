import { CacheProvider, EmotionCache } from "@emotion/react";
import { I18nProvider } from "@lingui/react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { AppProps } from "next/app";
import { useRouter } from "next/router";

import { GraphqlProvider } from "@/graphql/api";
import { localeAtom } from "@/lib/use-locale";
import { i18n, Locale } from "@/locales/locales";
import blwTheme from "@/theme/blw";
import { createEmotionCache } from "@/theme/emotion-cache";
import { setup as setupMatomo, useMatomo } from "@/utils/matomo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider, useSetAtom } from "jotai";
import { PropsWithChildren, useEffect } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClientAtom } from "jotai-tanstack-query";
import { useHydrateAtoms } from "jotai/react/utils";

setupMatomo();

const queryClient = new QueryClient();
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const HydrateAtoms = ({ children }: PropsWithChildren) => {
  useHydrateAtoms([[queryClientAtom, queryClient]]);
  return children;
};

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const router = useRouter();
  const setLocale = useSetAtom(localeAtom);

  const locale = (router.locale || "de") as Locale;
  useEffect(() => {
    setLocale(locale);
  }, [locale, setLocale]);

  useMatomo();

  if (i18n.locale !== locale) {
    i18n.activate(locale);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <HydrateAtoms>
          <CacheProvider value={emotionCache}>
            <I18nProvider i18n={i18n}>
              <GraphqlProvider>
                <ThemeProvider theme={blwTheme}>
                  <CssBaseline />
                  <Component {...pageProps} />
                </ThemeProvider>
              </GraphqlProvider>
            </I18nProvider>
          </CacheProvider>
        </HydrateAtoms>
      </Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
