import type { Color, Shadows, Theme } from "@mui/material";

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
    monochrome: FederalColor;
    red: FederalColor;
    scale?: {
      blue: FederalColor;
      brown: FederalColor;
      green: FederalColor;
      orange: FederalColor;
      red: FederalColor;
      yellow: FederalColor;
    };
  }

  interface Palette {
    cobalt: FederalColor;
    monochrome: FederalColor;
    red: FederalColor;
    scale: {
      blue: FederalColor;
      brown: FederalColor;
      green: FederalColor;
      orange: FederalColor;
      red: FederalColor;
      yellow: FederalColor;
    };
  }
}

declare module "@mui/material/styles" {
  type BLWShadows = {
    sm: string;
    base: string;
    md: string;

    /** Default card shadow */
    lg: string;
    xl: string;

    /** Hovered card shadow */
    xxl: string;
  };

  interface Theme {
    shadows: BLWShadows & Shadows;
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
