export const getMarketColor = (slug?: string | null) => {
  switch (slug) {
    case "milch-und-milchprodukte":
    case "lait-et-produits-laitiers":
    case "latte-e-latticini":
    case "milk":
      return ["#000000", "#6C84B5"];
    case "milch-und-fleischersatzprodukte":
    case "lait-et-substituts-de-viande":
    case "sostituti-del-latte-e-della-carne":
    case "milk-and-meat-substitutes":
      return ["#000000", "#B0BDD7"];
    case "fruchte-gemuese-speisepilze":
    case "fruits-et-legumes":
    case "frutta-e-verdura":
    case "fruits-and-vegetables":
      return ["#000000", "#A9D18D"];
    case "fleisch":
    case "viande":
    case "carne":
    case "meat":
      return ["#000000", "#F47769"];
    case "getreide":
    case "pain-et-ceraales":
    case "pane-e-cereali":
    case "bread-and-cereals":
      return ["#000000", "#F9B067"];
    case "eier":
    case "oeufs":
    case "uova":
    case "eggs":
      return ["#000000", "#EDD15A"];
    case "futtermittel":
    case "alimentation":
    case "alimentazione":
    case "feed":
      return ["#ffffff", "#6B503F"];
    case "kartoffeln":
    case "pommes-de-terre":
    case "patate":
    case "potatoes":
      return ["#000000", "#9C7958"];
    case "olsaaten":
    case "graines-oleagineuses":
    case "semi-oleosi":
    case "oil-seeds":
      return ["#000000", "#AA8F1F"];
    default:
      return ["#000000", "#ACB4BD"];
  }
};
