import { gridColumn } from "@/components/Grid/Grid";
import { makeStyles } from "@/components/style-utils";
import { useStickyBox } from "react-sticky-box";

const ASIDE_NB_COLUMNS = 2;

// Due to how gridColumn is implemented, we need to override the margin-left
// to be 0 in cases when the first grid element (the aside) is displayed none
const noMarginLeft = {
  "&&": {
    marginLeft: 0,
  },
};

export const useLayoutStyles = makeStyles()((theme) => ({
  aside: {
    [theme.breakpoints.up("xxl")]: {
      ...gridColumn(ASIDE_NB_COLUMNS),
      // Prevent table of contents to stick to footer when at bottom
      // of the page
      paddingBottom: 124,
    },
    [theme.breakpoints.down("xxl")]: { display: "none" },
    height: "fit-content",
  },
  content: {
    [theme.breakpoints.up("xxl")]: gridColumn(8),
    [theme.breakpoints.down("xxl")]: { ...gridColumn(12), ...noMarginLeft },
    [theme.breakpoints.down("xl")]: { ...gridColumn(6), ...noMarginLeft },
  },
}));

export const useHeroStyles = makeStyles<{ shiftedLeft: boolean }>()((theme, { shiftedLeft }) => ({
  shifter: {
    [theme.breakpoints.up("xxl")]: gridColumn(ASIDE_NB_COLUMNS),
    [theme.breakpoints.down("xxl")]: {
      display: "none",
    },
  },
  heroContent: {
    [theme.breakpoints.up("xxl")]: gridColumn(10 - (shiftedLeft ? 2 : 0)),
    [theme.breakpoints.down("xxl")]: { ...gridColumn(12), ...noMarginLeft },
    [theme.breakpoints.down("xl")]: { ...gridColumn(6), ...noMarginLeft },
  },
}));

export const useTableOfContentsSticky = () => {
  return useStickyBox({ offsetTop: 200 });
};
