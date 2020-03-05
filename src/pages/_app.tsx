import { AppProps } from "next/app";
import { ThemeProvider } from "theme-ui";
import { GraphqlProvider } from "../graphql";
import { theme } from "../theme";
import {
  LocaleProvider,
} from "@interactivethings/visualize-app";
import { useRouter } from "next/router";

export default ({ Component, pageProps }: AppProps) => {
  const { query } = useRouter();
  const locale = query.locale as $FixMe || "de";
  return (
    <LocaleProvider value={locale}>
      <GraphqlProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </GraphqlProvider>
    </LocaleProvider>
  );
};
