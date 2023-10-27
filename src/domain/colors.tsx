import { getMarketFromSlug } from "@/domain/market";

export const colorsPerMarket = {
  milk: {
    backgroundColor: "#6C84B5",
    contrastText: "#000000",
    dashColor: "#6C84B5",
    color: "#1F2937",
  },
  "milk-and-meat-substitutes": {
    backgroundColor: "#B0BDD7",
    contrastText: "#000000",
    dashColor: "#B0BDD7",
    color: "#30415E",
  },
  "fruits-and-vegetables": {
    backgroundColor: "#C5E0B2",
    contrastText: "#000000",
    dashColor: "#A9D18D",
    color: "#495B46",
  },
  meat: {
    backgroundColor: "#FBCDC8",
    contrastText: "#000000",
    dashColor: "#F47769",
    color: "#A8322D",
  },

  "bread-and-cereals": {
    backgroundColor: "#FDCC95",
    contrastText: "#000000",
    dashColor: "#F9B067",
    color: "#7B441F",
  },
  eggs: {
    backgroundColor: "#F7EBB6",
    contrastText: "#000000",
    dashColor: "#EDD15A",
    color: "#695501",
  },
  feed: {
    backgroundColor: "#825B40",
    contrastText: "#FFFFFF",
    dashColor: "#6B503F",
    color: "#F9FAFB",
  },
  potatoes: {
    backgroundColor: "#CFBCAA",
    contrastText: "#000000",
    dashColor: "#9C7958",
    color: "#5B4632",
  },

  "oil-seeds": {
    backgroundColor: "#AA8F1F",
    contrastText: "#000000",
    dashColor: "#AA8F1F",
    color: "#111827",
  },
  default: {
    backgroundColor: "#DFE4E9",
    contrastText: "#000000",
    dashColor: "#ACB4BD",
    color: "#1F2937",
  },
};

export const getMarketColor = (slug?: string | null) => {
  const market = getMarketFromSlug(slug);
  const colors = colorsPerMarket[market];
  return [colors.contrastText, colors.dashColor];
};
