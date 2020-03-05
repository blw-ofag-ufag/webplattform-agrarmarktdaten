import { swiss } from "@theme-ui/presets";

export const theme = {
  ...swiss,
  cards: {
    primary: {
      padding: 3,
      borderRadius: 5,
      boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
      cursor: "pointer"
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: "1px solid",
      borderColor: "muted"
    }
  }
};
