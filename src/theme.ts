import { swiss } from "@theme-ui/presets";

export const theme = {
  ...swiss,
  buttons: {
    invisible: {
      fontFamily: "Manrope",
      appearance: "none",
      backgroundColor: "green",
      fontSize: 18,
      fontWeight: 900,
      margin: "0.5rem 0",
      padding: "0.625rem",
      background: "transparent",
      border: "none",
      color: "#343534"
    }
  },
  cards: {
    primary: {
      padding: 3,
      borderRadius: 5,
      boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
      cursor: "pointer"
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: "1px solid",
      borderColor: "muted"
    }
  }
};

/**
 * Load these fonts early using <link rel="preload" />
 * Use WOFF2 fonts if possible!
 */
export const preloadFonts = [
  "/fonts/Manrope-Bold.woff2",
  "/fonts/Manrope-Regular.woff2",
  "/fonts/Manrope-Light.woff2"
];

/**
 * Global styles to load font files or similar things
 */
export const globalStyles = `
  @font-face {
    font-family: "Manrope";
    font-style: normal;
    font-weight: 700;
    src: url("/fonts/Manrope-Bold.woff2") format("woff2"),
      url("/fonts/Manrope-Bold.woff") format("woff");
  }
  @font-face {
    font-family: "Manrope";
    font-style: normal;
    font-weight: 400;
    src: url("/fonts/Manrope-Regular.woff2") format("woff2"),
      url("/fonts/Manrope-Regular.woff") format("woff");
  }
  @font-face {
    font-family: "Manrope";
    font-style: normal;
    font-weight: 300;
    src: url("/fonts/Manrope-Light.woff2") format("woff2"),
      url("/fonts/Manrope-Light.woff") format("woff");
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
    svg, img {
      display: block;
    }

    overscroll-behavior:  none;

    // Use momentum-based scrolling on iOS devices
    -webkit-overflow-scrolling: touch;

    // Auto-hide scrollbars in Edge
    -ms-overflow-style: -ms-autohiding-scrollbar;

  }

  fieldset {
    border: 0;
    padding: 0.01em 0 0 0;
    margin: 0;
    min-width: 0;
  }
`;
