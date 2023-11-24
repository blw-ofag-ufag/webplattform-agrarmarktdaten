import * as React from "react";
import type { Preview } from "@storybook/react";
import theme from "../src/theme/blw/index";
import { breakpoints } from "@interactivethings/swiss-federal-ci";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@/locales/locales";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
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

const preview: Preview = {
  decorators: [
    (Story) => {
      return (
        <I18nProvider i18n={i18n}>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <Story />
              <ReactQueryDevtools />
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
