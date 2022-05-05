import { I18nProvider } from "@lingui/react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { GraphqlProvider } from "../graphql";
import { LocaleProvider } from "../lib/use-locale";
import { i18n, Locale } from "../locales/locales";
import theme from "../theme";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const locale = (router.locale || "de") as Locale;
  if (i18n.locale !== locale) {
    i18n.activate(locale);
  }

  return (
    <LocaleProvider value={locale}>
      <I18nProvider i18n={i18n}>
        <GraphqlProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </GraphqlProvider>
      </I18nProvider>
    </LocaleProvider>
  );
}
