export const getMarketColor = (slug?: string | null) => {
  switch (slug) {
    case "milch":
    case "lait":
    case "latte":
    case "milk":
      return "#6C84B5";
    case "milch-und-fleischersatzprodukte":
    case "lait-et-substituts-de-viande":
    case "sostituti-del-latte-e-della-carne":
    case "milk-and-meat-substitutes":
      return "#B0BDD7";
    case "fruchte-gemuse":
    case "fruits-et-legumes":
    case "frutta-e-verdura":
    case "fruits-and-vegetables":
      return "#A9D18D";
    case "fleisch":
    case "viande":
    case "carne":
    case "meat":
      return "#F47769";
    case "brot-und-getreide":
    case "pain-et-ceraales":
    case "pane-e-cereali":
    case "bread-and-cereals":
      return "#F9B067";
    case "eier":
    case "oeufs":
    case "uova":
    case "eggs":
      return "#EDD15A";
    case "futtermittel":
    case "alimentation":
    case "alimentazione":
    case "feed":
      return "#6B503F";
    case "kartoffeln":
    case "pommes-de-terre":
    case "patate":
    case "potatoes":
      return "#9C7958";
    case "olsaaten":
    case "graines-oleagineuses":
    case "semi-oleosi":
    case "oil-seeds":
      return "#AA8F1F";
    default:
      return "#ACB4BD";
  }
};
