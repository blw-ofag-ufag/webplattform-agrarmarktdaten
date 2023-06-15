import { CacheProvider, EmotionCache } from "@emotion/react";
import { I18nProvider } from "@lingui/react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { AppProps } from "next/app";
import { useRouter } from "next/router";

import { GraphqlProvider } from "@/graphql/api";
import { LocaleProvider } from "@/lib/use-locale";
import { i18n, Locale } from "@/locales/locales";
import blwTheme from "@/theme/blw";
import { createEmotionCache } from "@/theme/emotion-cache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const router = useRouter();
  const locale = (router.locale || "de") as Locale;
  if (i18n.locale !== locale) {
    i18n.activate(locale);
  }

  return (
    <CacheProvider value={emotionCache}>
      <LocaleProvider value={locale}>
        <I18nProvider i18n={i18n}>
          <GraphqlProvider>
            <ThemeProvider theme={blwTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </GraphqlProvider>
        </I18nProvider>
      </LocaleProvider>
    </CacheProvider>
  );
}
