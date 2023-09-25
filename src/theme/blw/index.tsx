import { createTheme } from "@mui/material/styles";
import { breakpoints } from "@interactivethings/swiss-federal-ci";

import federalTheme from "@/theme/federal";

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
  },
});

export default theme;
