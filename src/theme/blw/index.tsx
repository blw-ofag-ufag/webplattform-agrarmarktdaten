import { createTheme } from "@mui/material/styles";
import { breakpoints } from "@interactivethings/swiss-federal-ci";
import { deepmerge } from "@mui/utils";
import federalTheme from "@/theme/federal";

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
  },
});

const theme = createTheme(deepmerge(blwTheme, federalTheme));

export default theme;
