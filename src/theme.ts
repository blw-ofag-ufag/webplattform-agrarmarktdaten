export const theme = {
  breakpoints: ["48em", "62em", "75em"],

  colors: {
    text: "#161616",
    background: "#FFFFFF",
    link: "#006699",

    primary: "#006699",
    primaryHover: "#004B70",
    primaryActive: "#00334D",
    primaryDisabled: "#599cbd",
    primaryLight: "#BFD9E5",
    primaryLighter: "#D9E8F0",

    secondary: "hsl(10, 60%, 50%)",
    highlight: "hsl(10, 40%, 90%)",
    purple: "hsl(250, 60%, 30%)",
    muted: "#E7E7E7",
    gray: "hsl(10, 20%, 50%)",

    egg: "#998A00",
    eggLight: "#FFF9C4",
    eggLightHover: "#FFF59D",
    meat: "#880E4F",
    meatLight: "#FFCDD2",
    meatLightHover: "#EF9A9A",
    fruit: "#476B00",
    fruitLight: "#F0F4C3",
    fruitLightHover: "#E6EE9C",
    potato: "#936C4C",
    potatoHover: "#5B3E26",
    potatoActive: "#3D2A1A",
    potatoLight: "#F8EAC7",
    potatoLightHover: "#EDD69D",
    milk: "#673AB7",
    milkLight: "#EDE7F6",
    milkLightHover: "#D1C4E9",
    grain: "#66462B",
    grainLight: "#D7CCC8",
    grainLightHover: "#BCAAA4",
    mushroom: "#CC4A00",
    mushroomLight: "#FFCCBC",
    mushroomLightHover: "#FFAB91",
    bio: "#39A22B",
    bioLight: "#E8F5E9",
    bioLightHover: "#C8E6C9",

    monochrome100: "#FFFFFF",
    monochrome200: "#F5F5F5",
    monochrome300: "#E5E5E5",
    monochrome400: "#D5D5D5",
    monochrome500: "#CCCCCC",
    monochrome600: "#757575",
    monochrome700: "#454545",
    monochrome800: "#333333",
    monochrome900: "#000000",
  },
  space: [
    "0",
    "0.25rem",
    "0.5rem",
    "0.75rem",
    "1rem",
    "1.5rem",
    "2rem",
    "4rem",
    "4.5rem",
  ],
  fonts: {
    body:
      'Manrope, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: "inherit",
    monospace: "Menlo, monospace",
  },
  fontSizes: [
    "0rem",
    "0.625rem",
    "0.75rem",
    "0.875rem",
    "1rem",
    "1.125rem",
    "1.5rem",
    "2rem",
    "2.5rem",
    "3rem",
    "4.5rem",
    "5.5rem",
  ],
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    heading: 700,
    bold: 700,
    extraBold: 900,
  },
  lineHeights: {
    heading: 1.2,
    body: 1.5,
  },
  radii: {
    default: "1px",
  },
  textStyles: {
    heading: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      color: "text",
    },
    display: {
      variant: "textStyles.heading",
      fontSize: [5, 6],
      fontWeight: "display",
      letterSpacing: "-0.03em",
      mt: 3,
    },
  },
  styles: {
    Container: {
      p: 3,
      maxWidth: 1024,
    },
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
    },
    h1: {
      variant: "textStyles.display",
    },
    h2: {
      variant: "textStyles.heading",
      fontSize: 5,
    },
    h3: {
      variant: "textStyles.heading",
      fontSize: 4,
    },
    h4: {
      variant: "textStyles.heading",
      fontSize: 3,
    },
    h5: {
      variant: "textStyles.heading",
      fontSize: 2,
    },
    h6: {
      variant: "textStyles.heading",
      fontSize: 1,
    },
    a: {
      color: "text",
      "&:hover": {
        color: "text",
      },
    },
    pre: {
      variant: "prism",
      fontFamily: "monospace",
      fontSize: 1,
      p: 3,
      color: "text",
      bg: "muted",
      overflow: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      color: "secondary",
      fontSize: 1,
    },
    inlineCode: {
      fontFamily: "monospace",
      color: "secondary",
      bg: "muted",
    },
    table: {
      width: "100%",
      my: 4,
      borderCollapse: "separate",
      borderSpacing: 0,
      "th,td": {
        textAlign: "left",
        py: "4px",
        pr: "4px",
        pl: 0,
        borderColor: "muted",
        borderBottomStyle: "solid",
      },
    },
    th: {
      verticalAlign: "bottom",
      borderBottomWidth: "2px",
    },
    td: {
      verticalAlign: "top",
      borderBottomWidth: "1px",
    },
    hr: {
      border: 0,
      borderBottom: "1px solid",
      borderColor: "muted",
    },
    img: {
      maxWidth: "100%",
    },
  },
  prism: {
    ".comment,.prolog,.doctype,.cdata,.punctuation,.operator,.entity,.url": {
      color: "gray",
    },
    ".comment": {
      fontStyle: "italic",
    },
    ".property,.tag,.boolean,.number,.constant,.symbol,.deleted,.function,.class-name,.regex,.important,.variable": {
      color: "purple",
    },
    ".atrule,.attr-value,.keyword": {
      color: "primary",
    },
    ".selector,.attr-name,.string,.char,.builtin,.inserted": {
      color: "secondary",
    },
  },
  buttons: {
    reset: {
      background: "transparent",
      color: "text",
      p: 0,
      m: 0,
      border: "none",
    },
    primary: {
      bg: "primary",
      color: "monochrome100",
      borderRadius: "default",
      width: ["100%", "auto"],
      px: 7,
      py: 3,
      fontFamily: "body",
      fontSize: 4,
      transition: "background-color .2s",
      cursor: "pointer",
      ":hover": {
        bg: "primaryHover",
      },
      ":active": {
        bg: "primaryHover",
      },
      ":disabled": {
        cursor: "initial",
        bg: "primaryDisabled",
      },
    },
    inline: {
      background: "transparent",
      color: "primary",
      fontFamily: "body",
      lineHeight: [1, 2, 2],
      fontWeight: "regular",
      fontSize: [3, 3, 3],
      border: "none",
      cursor: "pointer",
      mb: 4,
      p: 0,
      ":hover": {
        color: "primaryHover",
      },
      ":disabled": {
        cursor: "initial",
        color: "monochrome500",
      },
    },
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
      color: "#343534",
    },
  },
  links: {
    primary: {
      color: "link",
      textDecoration: "none",
      "&:hover": {
        filter: "brightness(65%)",
      },
      "&:active": {
        filter: "brightness(45%)",
      },
    },
    menu: {
      fontSize: 6,
      textDecoration: "none",
      color: "text",
      lineHeight: "heading",
      mx: 4,
      my: 0,
      py: [5, 5, 0],
      borderBottomWidth: ["1px", "1px", "none"],
      borderBottomStyle: ["solid", "solid", "none"],
      borderBottomColor: ["monochrome300", "monochrome300", "none"],
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
  cards: {
    primary: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: "1px solid",
      borderColor: "muted",
    },
  },
};

/**
 * Load these fonts early using <link rel="preload" />
 * Use WOFF2 fonts if possible!
 */
export const preloadFonts = [
  "/fonts/Manrope-Bold.woff2",
  "/fonts/Manrope-Regular.woff2",
  "/fonts/Manrope-Light.woff2",
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
