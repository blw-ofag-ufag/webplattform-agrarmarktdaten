import * as React from "react";
import type { Preview } from "@storybook/react";
import theme from "../src/theme/blw/index";
import { breakpoints } from "@interactivethings/swiss-federal-ci";
import { ThemeProvider } from "@mui/material";

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
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
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
