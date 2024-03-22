import * as React from "react";
import type { Preview } from "@storybook/react";
import theme from "../src/theme/blw/index";
import { MenuButton, breakpoints } from "@interactivethings/swiss-federal-ci";
import { IconButton, Menu, MenuItem, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { I18nProvider, useLingui } from "@lingui/react";
import { i18n } from "../src/locales/locales";
import { MathJaxContext } from "better-react-mathjax";
import { LicenseInfo } from "@mui/x-license-pro";

LicenseInfo.setLicenseKey(
  "849fcc78978d14fbb154f3821cb4e283Tz03NjgxMCxFPTE3MjkyNTY4NjkwMDAsUz1wcm8sTE09cGVycGV0dWFsLEtWPTI="
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const viewports = Object.entries(breakpoints).map(([key, value]) => {
  return {
    name: key,
    styles: {
      width: `${value}px`,
      height: "800px",
    },
  };
});

const I18nDevtools = () => {
  const [anchorRef, setAnchorRef] = React.useState<HTMLButtonElement>();
  const i18n = useLingui();
  const onSelect = (locale: string) => {
    setAnchorRef(undefined);
    i18n.i18n.activate(locale);
  };
  return (
    <>
      <IconButton
        sx={{ position: "absolute", bottom: "0.75rem", right: "4rem" }}
        onClick={(ev) => setAnchorRef(ev.currentTarget)}
      >
        🌐
      </IconButton>
      <Menu
        open={!!anchorRef}
        anchorEl={anchorRef}
        onClose={() => setAnchorRef(undefined)}
        sx={{
          // Above ReactQueryDevTools
          zIndex: 100000,
        }}
      >
        <MenuItem onClick={() => onSelect("de")}>DE</MenuItem>
        <MenuItem onClick={() => onSelect("fr")}>FR</MenuItem>
        <MenuItem onClick={() => onSelect("it")}>IT</MenuItem>
      </Menu>
    </>
  );
};

const preview: Preview = {
  decorators: [
    (Story) => {
      return (
        <I18nProvider i18n={i18n}>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <MathJaxContext version={3}>
                <Story />
              </MathJaxContext>
              <ReactQueryDevtools />
              <I18nDevtools />
            </QueryClientProvider>
          </ThemeProvider>
        </I18nProvider>
      );
    },
  ],

  parameters: {
    options: {
      showRoots: true,
      storySort: {
        method: "alphabetical",
        includeNames: true,
        order: ["Overview", "Design System", "Components"],
      },
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: { viewports },
  },
};

export default preview;
