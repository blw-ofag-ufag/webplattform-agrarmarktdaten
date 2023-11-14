/**
 * Do not edit this file
 */
import { b, c } from "@interactivethings/swiss-federal-ci";
import { Fade, Grow, selectClasses, autocompleteClasses } from "@mui/material";
import { Theme, createTheme } from "@mui/material/styles";
import { merge, omit } from "lodash";

import SvgIcCheckboxActive from "@/theme/federal/icons/IcCheckboxActive";
import SvgIcCheckboxDefault from "@/theme/federal/icons/IcCheckboxDefault";
import { IcControlChevronDown } from "@/icons/icons-jsx/control";
import shadows from "@/theme/federal/shadows";

import debugStyles from "./debug";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xxs: true;
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
    xxxl: true;
  }
}

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
    muted?: PaletteColorOptions;
    alert?: PaletteColorOptions;
    brand?: PaletteColorOptions;
    hint?: PaletteColorOptions;
  }

  interface ButtonPropsVariantOverrides {
    selectColorPicker: true;
    inline: true;
    inverted: true;
  }
}

const isSafari15 =
  typeof navigator !== "undefined" && navigator.vendor.indexOf("Apple") >= 0
    ? navigator.userAgent.match(/Version[/\s]([\d]+)/g)?.[0]?.split("/")?.[1] === "15"
    : false;

export const makeResponsiveFontMediaQueries = (theme: Theme) => ({
  mobile: theme.breakpoints.down("xxl"),
  desktop: theme.breakpoints.up("xxl"),
});

export type ResponsiveFontMediaQueries = ReturnType<typeof makeResponsiveFontMediaQueries>;

const createTypographyVariant = (theme: Theme, spec: Record<string, $IntentionalAny>) => {
  const responsiveFontMediaQueries = makeResponsiveFontMediaQueries(theme);
  const res = omit(spec, ["lineHeight", "fontSize"]);

  if (!res.fontFamily) {
    res.fontFamily = theme.typography.fontFamily;
  }

  res[responsiveFontMediaQueries.mobile] = {
    fontSize: `${spec.fontSize[0]}px`,
    lineHeight: `${spec.lineHeight[0]}px`,
  };

  res[responsiveFontMediaQueries.desktop] = {
    fontSize: `${spec.fontSize[1]}px`,
    lineHeight: `${spec.lineHeight[1]}px`,
  };

  return res;
};

/**
 * Theme conforming to the Swiss Federal CD guidelines
 *
 * Please do not edit here, it'll be published as a package from visualize.
 * BLW theme above should be edited instead.
 */
const theme = createTheme({
  palette: {
    primary: {
      light: "#d8e8ef",
      main: "#006699",
      hover: "#004B70",
      active: "#00334D",
      disabled: "#599cbd",
    },
    divider: "#CCCCCC",
    secondary: {
      main: "#757575",
      hover: "#616161",
      active: "#454545",
      disabled: "#a6a6a6",
    },
    success: {
      main: "#3c763d",
      light: "#DFF0D8",
      hover: "#3c763d",
      active: "#3c763d",
      disabled: "#DFF0D8",
    },
    muted: {
      main: "#F5F5F5",
      colored: "#F9FAFB",
      dark: "#F2F7F9",
    },
    brand: {
      main: "#DC0018",
    },
    hint: {
      main: "#757575",
    },
    alert: {
      main: "#DC0018",
      light: "#ffe6e1",
    },
    warning: {
      main: "#8a6d3b",
      light: "#FCF0B4",
    },
    info: {
      main: "#31708f",
      light: "#d9edf7",
    },
    error: {
      main: "#a82824",
      light: "#f2dede",
    },
    grey: {
      100: "#FFFFFF",
      200: "#F5F5F5",
      300: "#E5E5E5",
      400: "#D5D5D5",
      500: "#CCCCCC",
      600: "#757575",
      700: "#454545",
      800: "#333333",
      900: "#000000",
    },
    cobalt: c.cobalt,
    monochrome: c.monochrome,
    red: c.red,
  },
  breakpoints: {
    values: { ...b.values, xxxl: 1920 },
  },
  spacing: [0, 4, 8, 12, 16, 24, 32, 64, 72, 84, 96],

  shape: {
    borderRadius: 2,
  },
  shadows: shadows,

  typography: {
    fontFamily: [
      "Noto Sans",
      "FrutigerNeue",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Helvetica",
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

theme.typography = merge(theme.typography, {
  link: {
    textDecoration: "none",
  },
  h1: createTypographyVariant(theme, {
    fontSize: [24, 32],
    lineHeight: [36, 48],
    fontWeight: 700,
  }),
  h2: createTypographyVariant(theme, {
    fontSize: [20, 24],
    lineHeight: [28, 36],
    fontWeight: 700,
  }),
  h3: createTypographyVariant(theme, {
    fontSize: [18, 20],
    lineHeight: [28, 32],
    fontWeight: 700,
  }),
  h4: createTypographyVariant(theme, {
    fontSize: [16, 18],
    lineHeight: [24, 20],
    fontWeight: 700,
  }),
  h5: createTypographyVariant(theme, {
    fontSize: [14, 16],
    lineHeight: [22, 24],
    fontWeight: 700,
  }),
  h6: createTypographyVariant(theme, {
    fontSize: [12, 14],
    lineHeight: [18, 20],
    fontWeight: 700,
  }),
  body1: createTypographyVariant(theme, {
    fontSize: [16, 18],
    lineHeight: [28, 28],
    fontWeight: "regular",
  }),
  body2: createTypographyVariant(theme, {
    fontSize: [14, 16],
    lineHeight: [22, 24],
    fontWeight: "regular",
  }),
  body3: createTypographyVariant(theme, {
    fontSize: [12, 14],
    lineHeight: [18, 18],
    fontWeight: "normal",
  }),
  tag: createTypographyVariant(theme, {
    lineHeight: [18, 20],
    fontSize: [12, 14],
  }),
  display1: createTypographyVariant(theme, {
    fontSize: [38, 64],
    lineHeight: [58, 90],
    fontWeight: 700,
  }),
  display2: createTypographyVariant(theme, {
    fontSize: [30, 48],
    lineHeight: [46, 72],
    fontWeight: 700,
  }),
  caption: createTypographyVariant(theme, {
    fontSize: [10, 12],
    lineHeight: [16, 18],
    fontWeight: "regular",
  }),
});

const makeStandardAlertVariant = ({
  severity,
}: {
  severity: "info" | "warning" | "success" | "error";
}) => ({
  "&": {
    backgroundColor: theme.palette[severity].light,
  },
  "& > .MuiAlert-message": {
    color: theme.palette[severity].main,
  },
  "& > .MuiAlert-icon": {
    color: theme.palette[severity].main,
  },
});

theme.components = {
  MuiLink: {
    defaultProps: {
      underline: "hover",
      color: "inherit",
    },
    styleOverrides: {},
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        alignItems: "center",
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        textAlign: "left",
        pr: 1,
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        display: "-webkit-box",
        overflow: "hidden",
        fontSize: "0.875rem",
      },
      sizeSmall: {
        fontSize: "0.75rem",
      },
    },
  },
  MuiButton: {
    variants: [
      {
        props: { variant: "selectColorPicker" },
        style: {
          color: "grey.700",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "grey.100",
          p: 1,
          height: "40px",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: theme.palette.divider,
          ":hover": {
            backgroundColor: "grey.100",
          },
          ":active": {
            backgroundColor: "grey.100",
          },
          ":disabled": {
            cursor: "initial",
            backgroundColor: "muted.main",
          },
        },
      },
      {
        props: { variant: "inline" },
        style: {
          backgroundColor: "transparent",
          ":hover": {
            backgroundColor: "transparent",
          },
          fontSize: theme.typography.body2.fontSize,
          padding: 0,
          margin: 0,
          minHeight: "1rem",
          color: theme.palette.primary.main,
          ":active": {
            backgroundColor: "grey.100",
          },
          ":disabled": {
            color: "grey.500",
          },
        },
      },
      {
        props: { variant: "inverted" },
        style: {
          backgroundColor: theme.palette.primary.contrastText,
          color: theme.palette.primary.main,
          ":hover": {
            backgroundColor: theme.palette.grey[300],
          },
          ":active": {
            backgroundColor: theme.palette.grey[400],
          },
          ":disabled": {
            cursor: "initial",
            color: theme.palette.grey[600],
            backgroundColor: theme.palette.grey[300],
          },
        },
      },
    ],
    defaultProps: {
      variant: "contained",
      color: "primary",
    },
    styleOverrides: {
      sizeSmall: {
        ".MuiButton-startIcon": {
          marginRight: 4,
        },
        ".MuiButton-endIcon": {
          marginLeft: 4,
        },
      },
      sizeMedium: {
        fontSize: 14,
        lineHeight: "24px",
        minHeight: 40,
      },
      sizeLarge: {
        fontSize: "1rem",
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        minHeight: 44,

        ".MuiButton-startIcon > :nth-of-type(1)": {
          width: 20,
          height: 20,
        },
      },
      root: {
        padding: `${theme.spacing(4)}px ${theme.spacing(3)}px`,
        alignItems: "center",
        lineHeight: 1.25,
        justifyContent: "flex-start",
        borderRadius: 3,
        transition: "background-color .2s",
        cursor: "pointer",
        display: "inline-flex",
        flexGrow: 0,

        "& > svg": {
          width: 22,
          marginTop: -1,
          marginBottom: -1,
        },
        "& > svg:first-of-type": {
          marginRight: 2,
        },
        "& > svg:last-of-type": {
          marginLeft: 2,
        },
        textTransform: "none",
        boxShadow: "none",
      },
      containedPrimary: {
        "&:hover": {
          boxShadow: "none",
        },
      },
      containedSecondary: {
        "&:hover": {
          boxShadow: "none",
        },
      },
      textSizeSmall: {
        fontSize: "0.875rem",
        paddingTop: 0,
        paddingBottom: 0,

        ":hover": {
          backgroundColor: "transparent",
          color: theme.palette.primary.dark,
        },
        "& svg": {
          width: 16,
          height: 16,
        },
      },
      startIcon: {
        "&$iconSizeSmall": {
          marginRight: 4,
        },
        "&$endIcon": {
          marginLeft: 4,
        },
      },
    },
  },
  MuiButtonBase: {
    defaultProps: {
      // The props to apply
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
    styleOverrides: {
      root: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        "& .MuiListItemIcon-root.MuiListItemIcon-root": {
          minWidth: "24px",
        },
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      adornedStart: {
        "> svg:first-of-type": {
          margin: "0 0.5rem",
        },
      },
    },
  },
  MuiInput: {
    defaultProps: {
      disableUnderline: true,
    },
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.grey[100],
        border: "1px solid",
        borderColor: theme.palette.divider,
        borderRadius: (theme.shape.borderRadius as number) * 2,
        padding: "0 6px",
        minHeight: 48,
        "&.Mui-focused": {
          outline: "3px solid #333333",
        },
      },
      sizeSmall: {
        height: 40,
        minHeight: 40,
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: (theme.shape.borderRadius as number) * 1.5,
      },
    },
  },
  MuiAlertTitle: {
    styleOverrides: {
      root: {
        fontWeight: "bold",
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        "& > .MuiAlert-message": {
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          fontSize: `1rem`,
        },
      },
      standardSuccess: makeStandardAlertVariant({
        severity: "success",
      }),
      standardError: makeStandardAlertVariant({ severity: "error" }),
      standardWarning: makeStandardAlertVariant({ severity: "warning" }),
      standardInfo: makeStandardAlertVariant({ severity: "info" }),
    },
  },
  MuiCheckbox: {
    defaultProps: {
      checkedIcon: <SvgIcCheckboxActive width={20} />,
      icon: <SvgIcCheckboxDefault width={20} />,
    },
    styleOverrides: {
      root: {
        padding: 4,
        color: "primary.main",
        "&.Mui-disabled": {
          color: "grey.500",
          "&.Mui-checked": {
            color: "primary.disabled",
          },
        },
      },
      checked: {},
    },
  },
  // @ts-ignore
  MuiCalendarPicker: {
    styleOverrides: {
      root: {
        maxHeight: "330px",
        "& > :nth-child(2) > div > :nth-child(2)": {
          minHeight: 230,
        },
      },
    },
  },
  MuiPickersDay: {
    styleOverrides: {
      root: {
        justifyContent: "center",
        alignItems: "center",
        "&.Mui-selected": {
          color: "white",
        },
        "&.Mui-disabled.Mui-selected": {
          color: "rgba(255, 255, 255, 0.5)",
        },
      },
    },
  },
  MuiTable: {
    styleOverrides: {
      root: {
        fontSize: "0.875rem",
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        verticalAlign: "baseline",
      },
    },
  },
  MuiNativeSelect: {
    styleOverrides: {
      root: {
        paddingTop: "0.25rem",
      },
      outlined: {
        paddingLeft: "0.5rem",
      },
    },
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        width: 28,
        height: 16,
        padding: 0,
        marginRight: "0.5rem",

        display: "flex",

        "& .MuiSwitch-switchBase": {
          padding: 2,
          "&.Mui-checked": {
            transform: "translateX(12px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
              opacity: 1,
              backgroundColor: theme.palette.primary.main,
              border: 0,
            },
            ".MuiSwitch-thumb": {
              opacity: 1,
              backgroundColor: theme.palette.background.paper,
            },
          },
        },
        "& .MuiSwitch-thumb": {
          backgroundColor: theme.palette.grey[600],
          width: 12,
          height: 12,
          borderRadius: 6,
          transition: theme.transitions.create(["width"], {
            duration: 200,
          }),
        },
        "& .MuiSwitch-track": {
          borderRadius: 16 / 2,
          opacity: 1,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          boxSizing: "border-box",
        },
        "&:active": {
          "& .MuiSwitch-thumb": {
            width: 15,
          },
          "& .MuiSwitch-switchBase.Mui-checked": {
            transform: "translateX(9px)",
          },
        },
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
        minWidth: 128,
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
      },
      body: {
        color: "grey.800",
        fontWeight: "normal",
        borderBottomColor: theme.palette.grey[400],
      },
      head: {
        color: "grey.700",
        fontweight: "bold",
        borderBottomColor: theme.palette.grey[700],
      },
    },
  },
  MuiListSubheader: {
    styleOverrides: {
      root: {
        color: theme.palette.grey[900],
        fontWeight: "bold",
        borderBottom: "1px solid",
        borderBottomColor: theme.palette.grey[500],
      },
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        "& svg": {
          width: 16,
          height: 16,
        },
      },
    },
  },
  MuiCircularProgress: {
    defaultProps: {
      size: 16,
    },
  },
  MuiPopover: {
    defaultProps: {
      TransitionComponent: isSafari15 ? Fade : Grow,
    },
    styleOverrides: {
      root: {
        "& .MuiPaper-root": {
          borderRadius: 8,
          boxShadow: "0px 10px 30px 0px rgba(0, 0, 0, 0.34)",
        },
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: {
        "& .MuiTabs-flexContainer": {
          gap: 4,
        },
        "& .MuiTabs-indicator": {
          display: "none",
        },
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        justifyContent: "center",
        alignItems: "center",
        height: 49,
        paddingTop: 0,
        paddingRight: 24,
        paddingBottom: 0,
        paddingLeft: 24,
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.grey[900],
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        boxShadow: shadows[6],

        "&.Mui-selected": {
          height: 50,
          color: theme.palette.primary.main,
        },
      },
    },
  },
  MuiSelect: {
    defaultProps: {
      IconComponent: IcControlChevronDown,
    },
    styleOverrides: {
      root: {
        width: "100%",
        height: "48px",
        backgroundColor: "#ffffff",
        borderRadius: 4,
        "&:hover": {
          backgroundColor: c.monochrome[100],
        },
        [`& .MuiOutlinedInput-notchedOutline`]: {
          border: `1px solid ${theme.palette.cobalt[200]}`,
        },
        "& .MuiSelect-icon": {
          fontSize: "2rem",
        },
        [`& .${selectClasses.select}`]: {
          color: "cobalt.400",
        },
      },
    },
  },
  MuiList: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      root: {
        paddingY: 0,
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        height: "48px",
        "&.Mui-selected": {
          backgroundColor: "transparent",
        },
        "&.Mui-selected:hover": {
          backgroundColor: c.monochrome[100],
        },
        "&.Mui-selected.Mui-focusVisible": {
          backgroundColor: "transparent",
        },
      },
    },
  },
  MuiAutocomplete: {
    styleOverrides: {
      root: {
        width: "100%",
        [`& .${autocompleteClasses.inputRoot}`]: {
          paddingTop: 3,
          paddingBottom: 3,
          backgroundColor: "white",
        },
        [`& .MuiOutlinedInput-notchedOutline`]: {
          border: `1px solid ${theme.palette.cobalt[200]}`,
        },
        [`& .${autocompleteClasses.input}`]: {
          fontSize: "18px",
        },
        [`& .MuiOutlinedInput-root.MuiAutocomplete-input`]: {
          paddingLeft: 0,
        },
      },
    },
  },
  MuiCssBaseline: {
    styleOverrides: `
          svg {
            display: block
          }

          [tabindex="-1"]:focus { outline: 0; }

          fieldset {
            border: 0;
            padding: 0.01em 0 0 0;
            margin: 0;
            minWidth: 0;
          }

          html {
            margin: 0;
            padding: 0;
            font-family: ${theme.typography.fontFamily};
            -webkit-overflow-scrolling: touch;
            -ms-overflow-style: -ms-autohiding-scrollbar;
          }

          ${debugStyles}
          `,
  },
};

export default theme;
