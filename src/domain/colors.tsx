export const getMarketAreaColor = (slug?: string) => {
  switch (slug) {
    case "eggs":
    case "eier":
      return "egg";
    case "fleisch":
    case "meat":
      return "meat";
    case "fruchte-gemuse":
    case "fruits-and-vegetables":
      return "fruit";
    case "kartoffeln":
    case "potatoes":
      return "potato";
    case "milch":
    case "milk":
      return "milk";
    case "brot-and-getreide":
    case "bread-and-grain":
      return "grain";
    case "speisepilze":
    case "mushrooms":
      return "mushroom";
    case "bio":
    case "organic":
      return "bio";
    default:
      return "primary";
  }
};
