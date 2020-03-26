import { css, Global } from "@emotion/core";
import { LocaleProvider } from "@interactivethings/visualize-app";
import { I18nProvider } from "@lingui/react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ThemeProvider } from "theme-ui";
import { GraphqlProvider } from "../graphql";
import { catalogs } from "../locales/locales";
import { globalStyles, theme } from "../theme";

export default ({ Component, pageProps }: AppProps) => {
  const { query } = useRouter();
  const locale = (query.locale as $FixMe) || "de";

  return (
    <LocaleProvider value={locale}>
      <I18nProvider language={locale} catalogs={catalogs}>
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
};
