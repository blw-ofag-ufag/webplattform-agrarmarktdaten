import * as React from "react";
import ChevronUp from "@/icons/icons-jsx/control/IcControlChevronUp";
import { makeStyles } from "@/components/style-utils";
import { IconButton } from "@mui/material";

const useStyles = makeStyles()(({ palette: c, shadows: z, breakpoints: b }) => ({
  wrapper: {
    "--buttonPadding": "1rem",
    "--buttonSize": "64px",

    [b.down("xl")]: {
      "--buttonSize": "2.625rem",
    },

    position: "absolute",

    // Should start after the fold
    top: "80vh",
    bottom: "calc(-1 * (var(--buttonSize) + var(--buttonPadding)))",
    width: "var(--buttonSize)",
    right: "var(--buttonPadding)",
    zIndex: 1,
  },
  scrollToTop: {
    top: "calc(100vh - 5rem)",
    width: "var(--buttonSize)",
    height: "var(--buttonSize)",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: c.background.paper,
    border: `1px solid ${c.cobalt[400]}`,
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: c.cobalt[100],
    },

    boxShadow: z.xl,

    position: "sticky",
  },
}));

const ScrollToTop = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <IconButton
        onClick={() => window?.scrollTo({ top: 0, behavior: "smooth" })}
        className={classes.scrollToTop}
      >
        <ChevronUp width={48} height={48} />
      </IconButton>
    </div>
  );
};

export default ScrollToTop;
