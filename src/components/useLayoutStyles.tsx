import { gridColumn } from "@/components/Grid/Grid";
import { makeStyles } from "@/components/style-utils";

const ASIDE_NB_COLUMNS = 2;

export const useLayoutStyles = makeStyles()((theme) => ({
  aside: {
    [theme.breakpoints.up("xl")]: gridColumn(ASIDE_NB_COLUMNS),
    [theme.breakpoints.down("xl")]: { display: "none" },
    height: "fit-content",
  },
  content: {
    [theme.breakpoints.up("xl")]: gridColumn(12 - ASIDE_NB_COLUMNS),
    [theme.breakpoints.down("xl")]: gridColumn(6),
    [theme.breakpoints.down("lg")]: gridColumn(4),
  },
}));

export const useHeroStyles = makeStyles<{ shiftedLeft: boolean; shiftedRight: boolean }>()(
  (theme, { shiftedLeft, shiftedRight }) => ({
    shifter: {
      [theme.breakpoints.up("xl")]: gridColumn(ASIDE_NB_COLUMNS),
      [theme.breakpoints.down("xl")]: {
        display: "none",
      },
    },
    heroContent: {
      [theme.breakpoints.up("xl")]: gridColumn(
        12 - (shiftedLeft ? ASIDE_NB_COLUMNS : 0) - (shiftedRight ? ASIDE_NB_COLUMNS : 0)
      ),
      [theme.breakpoints.down("xl")]: gridColumn(6),
      [theme.breakpoints.down("lg")]: gridColumn(4),
    },
  })
);
