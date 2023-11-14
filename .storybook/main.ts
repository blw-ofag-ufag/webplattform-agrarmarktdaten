import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  //NOTE: Do not include the catalog folder as those are docs belong to catalog. Going forward we only want to support storybook but
  // catalog's docs were still part of a previous deliverable so they need to be accessible at /docs.
  // If something does not show on storybook and it's supposed to just add the path here
  stories: ["../src/components/*.mdx", "../docs/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm",
  ],
  previewHead: (head) => {
    // Need to be in sync with what's in _document
    return `
      ${head}

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700&display=swap"
        rel="stylesheet"
      />

    `;
  },
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
