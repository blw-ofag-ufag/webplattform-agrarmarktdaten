import { css, Global } from "@emotion/core";
import { LocaleProvider } from "@interactivethings/visualize-app";
import { I18nProvider } from "@lingui/react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ThemeProvider } from "theme-ui";
import { GraphqlProvider } from "../graphql";
import { i18n, Locale } from "../locales/locales";
import { globalStyles, theme } from "../theme";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const locale = (router.query.locale as Locale) || "de";
  if (i18n.locale !== locale) {
    i18n.activate(locale);
  }

  return (
    <LocaleProvider value={locale}>
      <I18nProvider i18n={i18n}>
        <GraphqlProvider>
          <ThemeProvider theme={theme}>
            <Global
              styles={css`
                ${globalStyles}
              `}
            />
            <Component {...pageProps} />
          </ThemeProvider>
        </GraphqlProvider>
      </I18nProvider>
    </LocaleProvider>
  );
}
