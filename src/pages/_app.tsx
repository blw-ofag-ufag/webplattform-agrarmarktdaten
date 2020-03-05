import { AppProps } from "next/app";
import { ThemeProvider } from "theme-ui";
import { GraphqlProvider } from "../graphql";
import { theme } from "../theme";

export default ({ Component, pageProps }: AppProps) => {
  return (
    <GraphqlProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </GraphqlProvider>
  );
};
