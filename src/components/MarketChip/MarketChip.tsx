import * as React from "react";
import { Chip } from "@mui/material";
import { makeStyles } from "@/components/style-utils";

interface Props {
  slug: string;
  label: string;
}

const useStyles = makeStyles()({
  chip: {
    paddingX: "18px",
    paddingY: "6px",
    lineHeight: "18px",
    fontSize: "14px",
  },
});

const MarketChip = (props: Props) => {
  const { slug, label } = props;
  const { classes } = useStyles();
  switch (slug) {
    case "milch-und-milchprodukte":
    case "lait-et-produits-laitiers":
    case "latte-e-latticini":
    case "milk":
      return (
        <Chip
          className={classes.chip}
          sx={{ backgroundColor: "#6C84B5", color: "#1F2937" }}
          label={label}
        />
      );
    case "milch-und-fleischersatzprodukte":
    case "lait-et-substituts-de-viande":
    case "sostituti-del-latte-e-della-carne":
    case "milk-and-meat-substitutes":
      return (
        <Chip
          className={classes.chip}
          sx={{ backgroundColor: "#B0BDD7", color: "#30415E" }}
          label={label}
        />
      );
    case "fruchte-gemuese-speisepilze":
    case "fruits-et-legumes":
    case "frutta-e-verdura":
    case "fruits-and-vegetables":
      return (
        <Chip
          className={classes.chip}
          sx={{ backgroundColor: "#C5E0B2", color: "#495B46" }}
          label={label}
        />
      );
    case "fleisch":
    case "viande":
    case "carne":
    case "meat":
      return (
        <Chip
          className={classes.chip}
          sx={{ backgroundColor: "#FBCDC8", color: "#A8322D" }}
          label={label}
        />
      );
    case "getreide":
    case "pain-et-ceraales":
    case "pane-e-cereali":
    case "bread-and-cereals":
      return (
        <Chip
          className={classes.chip}
          sx={{ backgroundColor: "#FDCC95", color: "#7B441F" }}
          label={label}
        />
      );
    case "eier":
    case "oeufs":
    case "uova":
    case "eggs":
      return (
        <Chip
          className={classes.chip}
          sx={{ backgroundColor: "#F7EBB6", color: "#695501" }}
          label={label}
        />
      );
    case "futtermittel":
    case "alimentation":
    case "alimentazione":
    case "feed":
      return (
        <Chip
          className={classes.chip}
          sx={{ backgroundColor: "#825B40", color: "#F9FAFB" }}
          label={label}
        />
      );
    case "kartoffeln":
    case "pommes-de-terre":
    case "patate":
    case "potatoes":
      return (
        <Chip
          className={classes.chip}
          sx={{ backgroundColor: "#CFBCAA", color: "#5B4632" }}
          label={label}
        />
      );
    case "olsaaten":
    case "graines-oleagineuses":
    case "semi-oleosi":
    case "oil-seeds":
      return (
        <Chip
          className={classes.chip}
          sx={{ backgroundColor: "#AA8F1F", color: "#111827" }}
          label={label}
        />
      );
    default:
      return (
        <Chip
          className={classes.chip}
          sx={{ backgroundColor: "#DFE4E9", color: "#1F2937" }}
          label={label}
        />
      );
  }
};

export default MarketChip;
