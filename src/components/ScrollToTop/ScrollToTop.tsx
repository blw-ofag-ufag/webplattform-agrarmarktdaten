import * as React from "react";
import ChevronUp from "@/icons/icons-jsx/control/IcControlChevronUp";
import { makeStyles } from "@/components/style-utils";
import { IconButton, IconButtonProps } from "@mui/material";

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
    top: "calc(100vh - var(--buttonSize) - var(--buttonPadding))",

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

export const ScrollToToWrapper = (props: React.HTMLProps<HTMLDivElement>) => {
  const { classes, cx } = useStyles();
  return <div {...props} className={cx(classes.wrapper, props.className)} />;
};

export const ScrollToTop = (props: IconButtonProps) => {
  const { classes, cx } = useStyles();
  return (
    <IconButton
      {...props}
      onClick={() => window?.scrollTo({ top: 0, behavior: "smooth" })}
      className={cx(classes.scrollToTop, props.className)}
    >
      <ChevronUp width={48} height={48} />
    </IconButton>
  );
};

const ScrollToTopWrapped = (props: React.ComponentProps<typeof ScrollToTop>) => {
  return (
    <ScrollToToWrapper>
      <ScrollToTop {...props} />
    </ScrollToToWrapper>
  );
};

export default ScrollToTopWrapped;
