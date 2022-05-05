import { createTheme } from "@mui/material/styles";
import federalTheme from "./federal";

const blwTheme = createTheme(federalTheme, {
  palette: {
    egg: {
      main: "#998A00",
      light: "#FFF9C4",
      lightHover: "#FFF59D",
    },

    meat: {
      main: "#880E4F",
      light: "#FFCDD2",
      lightHover: "#EF9A9A",
    },

    fruit: {
      main: "#476B00",
      light: "#F0F4C3",
      lightHover: "#E6EE9C",
    },

    potato: {
      main: "#936C4C",
      light: "#F8EAC7",
      lightHover: "#EDD69D",
    },

    milk: {
      main: "#673AB7",
      light: "#EDE7F6",
      lightHover: "#D1C4E9",
    },

    grain: {
      main: "#66462B",
      light: "#D7CCC8",
      lightHover: "#BCAAA4",
    },

    mushroom: {
      main: "#CC4A00",
      light: "#FFCCBC",
      lightHover: "#FFAB91",
    },

    bio: {
      main: "#39A22B",
      light: "#E8F5E9",
      lightHover: "#C8E6C9",
    },
  },
});

export default blwTheme;
