import { create as createTheme } from "@storybook/theming/create";
import { addons } from "@storybook/manager-api";

// Addons
addons.setConfig({
  theme: createTheme({
    base: "light",
    brandTitle: "AMDP Storybook",
    brandUrl: "https://agrimarketdata.ch/",
    brandTarget: "_self",
    appBorderRadius: 0,
    colorPrimary: "#23305f",
  }),
});
