import { createTheme } from "@mui/material/styles";
import { breakpoints } from "@interactivethings/swiss-federal-ci";
import { deepmerge } from "@mui/utils";
import federalTheme from "@/theme/federal";
import { IcControlChevronDown } from "@/icons/icons-jsx/control";

const blwTheme = createTheme({
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
  },
});

const theme = createTheme(deepmerge(blwTheme, federalTheme));

export default theme;
