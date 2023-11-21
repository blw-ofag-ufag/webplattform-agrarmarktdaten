import { makeStyles } from "@/components/style-utils";
import { Chip, ChipProps } from "@mui/material";

import { colorsPerMarket } from "@/domain/colors";
import { getMarketFromSlug } from "@/domain/market";
interface Props {
  slug?: string | null;
  label?: string | null;
  sx?: ChipProps["sx"];
}

const useStyles = makeStyles()({
  chip: {
    paddingX: "18px",
    paddingY: "6px",
    lineHeight: "18px",
    fontSize: "14px",
  },
  ...colorsPerMarket,
});

const MarketChip = (props: Props) => {
  const { slug, label, ...rest } = props;
  const { classes, cx } = useStyles();
  const market = getMarketFromSlug(slug);
  return (
    <Chip label={label} title={label} className={cx(classes.chip, classes[market])} {...rest} />
  );
};

export default MarketChip;
