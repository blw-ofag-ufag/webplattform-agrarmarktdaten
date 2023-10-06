import { createTheme } from "@mui/material/styles";
import { breakpoints } from "@interactivethings/swiss-federal-ci";
import federalTheme from "@/theme/federal";
import { IcControlChevronDown } from "@/icons/icons-jsx/control";

declare module "@mui/material" {
  interface ButtonPropsVariantOverrides {
    aside: true;
  }
}

const theme = createTheme(federalTheme, {
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
  },
});

export default theme;
