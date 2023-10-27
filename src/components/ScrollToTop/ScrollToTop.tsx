import { Box, Fade } from "@mui/material";
import * as React from "react";
import ChevronUp from "@/icons/icons-jsx/control/IcControlChevronUp";
import { useScrollTrigger } from "@/lib/useScrollTrigger";
import { makeStyles } from "@/components/style-utils";

const useStyles = makeStyles()(({ palette: c }) => ({
  root: {
    width: "54px",
    height: "54px",
    cursor: "pointer",
    backgroundColor: c.background.paper,
    padding: "2px",
    border: `1px solid ${c.cobalt[400]}`,
    borderRadius: "4px",
    position: "fixed",
    bottom: 100,
    right: 20,
    zIndex: 10,
    "&:hover": {
      backgroundColor: c.cobalt[100],
    },
  },
}));

const ScrollToTop = () => {
  const { classes } = useStyles();
  const trigger = useScrollTrigger({ threshold: 200 });
  return (
    <Fade in={trigger}>
      <Box
        onClick={() => window?.scrollTo({ top: 0, behavior: "smooth" })}
        className={classes.root}
      >
        <ChevronUp width={48} height={48} />
      </Box>
    </Fade>
  );
};

export default ScrollToTop;
