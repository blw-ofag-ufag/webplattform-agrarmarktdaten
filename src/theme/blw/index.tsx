import { createTheme } from "@mui/material/styles";

import federalTheme from "@/theme/federal";

const theme = createTheme(federalTheme, {
  breakpoints: {
    values: { xs: 0, sm: 768, md: 1024, lg: 1280, xl: 1360 },
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
