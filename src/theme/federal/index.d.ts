declare module "@mui/material" {
  interface PaletteColorOptions {
    light?: string;
    main: string;
    hover?: string;
    active?: string;
    disabled?: string;
    colored?: string;
    dark?: string;
  }

  interface PaletteOptions {
    muted: PaletteColorOptions;
    alert: PaletteColorOptions;
    organization: PaletteColorOptions;
    category: PaletteColorOptions;
    brand: PaletteColorOptions;
    hint: PaletteColorOptions;
  }

  interface TypographyPropsVariantOverrides {
    tag: true;
  }

  interface ButtonPropsVariantOverrides {
    selectColorPicker: true;
    inline: true;
    inverted: true;
  }
}
