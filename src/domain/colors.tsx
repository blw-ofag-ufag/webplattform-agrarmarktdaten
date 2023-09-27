export const getMarketColor = (slug?: string | null) => {
  switch (slug) {
    case "eggs":
    case "eier":
      return "#ACB4BD";
    case "fleisch":
    case "meat":
    case "fleisch":
    case "fr-meat":
    case "it-meat":
      return "#F47769";
    case "fruchte-gemuse":
    case "fruits-and-vegetables":
      return "#ACB4BD";
    case "kartoffeln":
    case "potatoes":
      return "#ACB4BD";
    case "milch":
    case "milk":
      return "#6C84B5";
    case "brot-and-getreide":
    case "bread-and-grain":
      return "#ACB4BD";
    case "speisepilze":
    case "mushrooms":
      return "#ACB4BD";
    case "bio":
      return "#ACB4BD";
    case "feed":
      return "#6B503E";
    default:
      return "#ACB4BD";
  }
};
