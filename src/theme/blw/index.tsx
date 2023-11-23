import { IcControlChevronDown } from "@/icons/icons-jsx/control";
import federalTheme from "@/theme/federal";
import { breakpoints } from "@interactivethings/swiss-federal-ci";
import { createTheme } from "@mui/material/styles";

import colors from "@/assets/mui-color-tokens.json";

declare module "@mui/material" {
  interface ButtonPropsVariantOverrides {
    aside: true;
  }
}

const theme = createTheme(federalTheme, {
  palette: {
    ...federalTheme,
    scale: {
      blue: colors.blue,
      brown: colors.brown,
      green: colors.green,
      orange: colors.orange,
      red: colors.red,
      yellow: colors.yellow,
    },
  },

  shadows: {
    ...federalTheme.shadows,

    // Values copied from Sketch
    // @see https://www.sketch.com/s/81803335-dd26-42f1-a505-6845270a91b7/layer-styles?g=Elevation&component=a41783c1-a658-4c47-be5e-9a8d5e122d36#Inspect
    sm: `0px 1px 2px rgba(0,0,0, 0.05)`,
    base: `0px 1px 5px rgba(0,0,0, 0.08), 0px 1px 2px rgba(0,0,0, 0.06)`,
    md: `0px 4px 10px -1px rgba(0,0,0, 0.08), 0px 2px 4px -1px rgba(0,0,0, 0.06)`,
    lg: `0px 5px 20px -2px rgba(0,0,0, 0.08), 0px 2px 6px -1px rgba(0,0,0, 0.05)`,
    xl: `0px 15px 25px -3px rgba(0,0,0, 0.08), 0px 6px 10px -5px rgba(0,0,0, 0.04)`,
    xxl: `0px 10px 20px rgba(0,0,0, 0.05), 1px 10px 70px -8px rgba(0,0,0, 0.13)`,
  },

  breakpoints: {
    values: breakpoints,
  },

  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          "&:hover": {
            textDecoration: "none",
          },
        },
      },
    },

    MuiAccordionSummary: {
      defaultProps: {
        expandIcon: <IcControlChevronDown width={24} height={24} />,
      },
    },

    MuiButton: {
      variants: [
        {
          props: { variant: "aside" },
          style: {
            borderRadius: 0,
            textTransform: "none",
            display: "flex",
            justifyContent: "center",
            color: federalTheme.palette.grey[700],
            border: "1px solid",
            borderColor: federalTheme.palette.grey[700],
          },
        },
        {
          props: { variant: "text" },
          style: {
            color: "grey.800",

            padding: 0,
            borderBottom: "1px solid",
            borderColor: "transparent",
            borderRadius: 0,
            ":hover": {
              backgroundColor: "transparent",
              borderBottom: "1px solid",
              borderColor: "grey.800",
            },
            "&.Mui-disabled": {
              color: "grey.500",
            },
          },
        },
      ],
    },
    MuiCheckbox: {
      defaultProps: {
        checkedIcon: undefined,
        icon: undefined,
      },
      styleOverrides: {
        root: {
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
  },
});

export default theme;
