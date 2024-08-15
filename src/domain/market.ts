export const getMarketFromSlug = (slug: string | undefined | null) => {
  switch (slug) {
    case "milch-und-milchprodukte":
    case "lait-et-produits-laitiers":
    case "latte-e-latticini":
    case "milk":
      return "milk";
    case "milch-und-fleischersatzprodukte":
    case "lait-et-substituts-de-viande":
    case "sostituti-del-latte-e-della-carne":
    case "milk-and-meat-substitutes":
      return "milk-and-meat-substitutes";
    case "fruchte-gemuese":
    case "fruits-et-legumes":
    case "frutta-e-verdura":
    case "fruits-and-vegetables":
      return "fruits-and-vegetables";
    case "fleisch":
    case "viande":
    case "carne":
    case "meat":
      return "meat";
    case "getreide":
    case "pain-et-ceraales":
    case "pane-e-cereali":
    case "bread-and-cereals":
      return "bread-and-cereals";
    case "eier":
    case "oeufs":
    case "uova":
    case "eggs":
      return "eggs";
    case "futtermittel":
    case "alimentation":
    case "alimentazione":
    case "feed":
      return "feed";
    case "kartoffeln":
    case "pommes-de-terre":
    case "patate":
    case "potatoes":
      return "potatoes";
    case "olsaaten":
    case "graines-oleagineuses":
    case "semi-oleosi":
    case "oil-seeds":
      return "oil-seeds";
    default:
      return "default";
  }
};

export type Market = ReturnType<typeof getMarketFromSlug>;
