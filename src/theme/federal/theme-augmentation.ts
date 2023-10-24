import { PaletteColor } from "@mui/material";
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    // body3: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    // body3: React.CSSProperties;
  }
}
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    // body3: true;
  }
}
// theme
declare module "@mui/material" {
  export type AugmentedColor = { main: string } & Color;

  export interface Palette {
    primary: PaletteColor;

    monochrome: AugmentedColor;
  }
}
