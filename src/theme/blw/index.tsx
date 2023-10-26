import { IcControlChevronDown } from "@/icons/icons-jsx/control";
import federalTheme from "@/theme/federal";
import { breakpoints } from "@interactivethings/swiss-federal-ci";
import { createTheme } from "@mui/material/styles";
import colors from "../../assets/mui-color-tokens.json";

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
