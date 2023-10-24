import { makeStyles } from "@/components/style-utils";
import { Chip } from "@mui/material";

interface Props {
  slug?: string | null;
  label?: string | null;
}

const useStyles = makeStyles()({
  chip: {
    paddingX: "18px",
    paddingY: "6px",
    lineHeight: "18px",
    fontSize: "14px",
  },
  milk: {
    backgroundColor: "#6C84B5",
    color: "#1F2937",
  },
  "milk-and-meat-substitutes": {
    backgroundColor: "#B0BDD7",
    color: "#30415E",
  },
  "fruits-and-vegetables": {
    backgroundColor: "#C5E0B2",
    color: "#495B46",
  },
  meat: {
    backgroundColor: "#FBCDC8",
    color: "#A8322D",
  },

  "bread-and-cereals": {
    backgroundColor: "#FDCC95",
    color: "#7B441F",
  },
  eggs: {
    backgroundColor: "#F7EBB6",
    color: "#695501",
  },
  feed: {
    backgroundColor: "#825B40",
    color: "#F9FAFB",
  },
  potatoes: {
    backgroundColor: "#CFBCAA",
    color: "#5B4632",
  },

  "oil-seeds": {
    backgroundColor: "#AA8F1F",
    color: "#111827",
  },
  default: {
    backgroundColor: "#DFE4E9",
    color: "#1F2937",
  },
});

const getTypeFromSlug = (slug: string | undefined | null) => {
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
    case "fruchte-gemuese-speisepilze":
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

const MarketChip = (props: Props) => {
  const { slug, label } = props;
  const { classes, cx } = useStyles();
  const type = getTypeFromSlug(slug);
  return <Chip label={label} className={cx(classes.chip, classes[type])} />;
};

export default MarketChip;
