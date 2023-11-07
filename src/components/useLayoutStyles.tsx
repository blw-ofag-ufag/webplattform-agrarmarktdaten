import { gridColumn } from "@/components/Grid/Grid";
import { makeStyles } from "@/components/style-utils";
import { useStickyBox } from "react-sticky-box";

const ASIDE_NB_COLUMNS = 2;

export const useLayoutStyles = makeStyles()((theme) => ({
  aside: {
    [theme.breakpoints.up("xl")]: {
      ...gridColumn(ASIDE_NB_COLUMNS),
      // Prevent table of contents to stick to footer when at bottom
      // of the page
      paddingBottom: 124,
    },
    [theme.breakpoints.down("xl")]: { display: "none" },
    height: "fit-content",
  },
  content: {
    [theme.breakpoints.up("xl")]: gridColumn(8),
    [theme.breakpoints.down("xl")]: gridColumn(6),
    [theme.breakpoints.down("lg")]: gridColumn(4),
  },
}));

export const useHeroStyles = makeStyles<{ shiftedLeft: boolean; shiftedRight: boolean }>()(
  (theme) => ({
    shifter: {
      [theme.breakpoints.up("xl")]: gridColumn(ASIDE_NB_COLUMNS),
      [theme.breakpoints.down("xl")]: {
        display: "none",
      },
    },
    heroContent: {
      [theme.breakpoints.up("xl")]: gridColumn(8),
      [theme.breakpoints.down("xl")]: gridColumn(6),
      [theme.breakpoints.down("lg")]: gridColumn(4),
    },
  })
);

export const useTableOfContentsSticky = () => {
  return useStickyBox({ offsetTop: 200 });
};
