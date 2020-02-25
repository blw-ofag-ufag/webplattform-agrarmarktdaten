import { AppProps } from "next/app";
import { ThemeProvider, Box } from "theme-ui";
import { theme } from "../theme";

export default ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: "64rem", mx: "auto", px: [3, 4] }}>
        <Component {...pageProps} />
      </Box>
    </ThemeProvider>
  );
};
