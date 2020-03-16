import { AppProps } from "next/app";
import { ThemeProvider, Box } from "theme-ui";
import { css, Global } from "@emotion/core";

import { theme, globalStyles } from "../theme";

import { GraphqlProvider } from "../graphql";

import { LocaleProvider } from "@interactivethings/visualize-app";
import { useRouter } from "next/router";

export default ({ Component, pageProps }: AppProps) => {
  const { query } = useRouter();
  const locale = (query.locale as $FixMe) || "de";
  return (
    <LocaleProvider value={locale}>
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
    </LocaleProvider>
  );
};
