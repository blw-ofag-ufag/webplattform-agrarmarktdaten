import type { Color, Theme } from "@mui/material";

export interface ThemeModule {
  theme: Theme;
  preloadFonts?: string[];
}

export type FederalColor = Omit<Color, "A100" | "A200" | "A400" | "A700">;

declare module "@mui/material" {
  interface TypographyVariants {
    display1: React.CSSProperties;
    display2: React.CSSProperties;
    body3: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    display1?: React.CSSProperties;
    display2?: React.CSSProperties;
    body3?: React.CSSProperties;
  }

  // interface Components<Theme = unknown> {}

  interface PaletteOptions {
    cobalt: FederalColor;
    red: FederalColor;
  }

  interface Palette {
    cobalt: FederalColor;
    red: FederalColor;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    display1: true;
    display2: true;
    body3: true;
  }
}
