import { CSSInterpolation } from "tss-react";
import { makeStyles } from "../style-utils";

const debugStyles = {
  position: "absolute" as "absolute",
  background: "hotpink",
  top: 0,
  right: 0,
} as Record<string, CSSInterpolation>;

/**
 * Following specification
 * @see https://www.notion.so/interactivethings/Refinements-Text-and-styles-177ccb469c30467087006f4d37c29c04?pvs=4
 */
const useStructuredTextStyles = makeStyles<
  { debug?: boolean },
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "ul"
  | "powerbiReportContainer"
  | "anchorHeaderWrapper"
>()((theme, { debug }, classes) => {
  const debugStyle = (name: string, rules: Record<string, CSSInterpolation>) => {
    return {
      ...(debug
        ? {
            position: "relative" as "relative",
            "&:after": {
              content: `'${name}'`,
              ...debugStyles,
            },
          }
        : {}),
      ...rules,
    };
  };

  const margins = {
    xs: {
      marginTop: 12,
      background: debug ? "yellow" : undefined,
    },
    md: {
      marginTop: 16,
      background: debug ? "orange" : undefined,
    },
    lg: {
      marginTop: 24,
      background: debug ? "green" : undefined,
    },
    xl: {
      marginTop: 32,
      background: debug ? "blue" : undefined,
    },
    xxl: {
      marginTop: 64,
      background: debug ? "red" : undefined,
    },
  };

  return {
    content: {
      color: theme.palette.monochrome[800],
      paddingBottom: 124,

      "& img": {
        marginTop: 32,
        marginBottom: 32,
      },
    },

    link: {
      color: "inherit",
      textUnderlineOffset: "2px",
      "&:hover": { color: theme.palette.monochrome[600] },
    },

    imageWrapper: {
      marginTop: "32px",
      marginBottom: "32px",
    },

    svgWrapper: {
      marginTop: "32px",
      marginBottom: "32px",
      width: "100%",
      height: "100%",
      position: "relative",
    },

    svg: {
      width: "100%",
      height: "auto",
    },

    linkButton: {
      fontWeight: "bold",
      display: "block",
      width: "fit-content",
      color: theme.palette.cobalt[500],
    },

    internalLinkParagraph: {
      "&&": {
        margin: 0,
      },
      [`& + .${classes.p}:not(&)`]: margins.lg,

      [`.${classes.powerbiReportContainer} + &`]: {
        // Put the internal link paragraph at the same level as the fullscreen button
        // of the PowerBI report
        marginTop: "-3rem",

        [theme.breakpoints.down("sm")]: {
          // Remove margin since fullscreen button is not shown in mobile
          marginTop: 0,
        },
      },
    },

    externalLink: {
      textDecoration: "none",
      color: "inherit",
    },

    imageTitle: {
      marginTop: theme.spacing(3),
      color: theme.palette.monochrome[500],
    },

    powerbiReportContainer: {
      position: "relative",
      marginBottom: 12,
      marginTop: 12,
    },

    p: debugStyle("p", {
      wordBreak: "break-word",
      display: "block",
      "& + & ": margins.lg,

      "& ul": {
        background: debug ? "grey" : undefined,
      },

      "ul &": {
        marginBottom: 0,
      },

      [`.${classes.h1} + &, .${classes.h2} + &, .${classes.anchorHeaderWrapper} + &`]: margins.lg,
    }),
    h1: debugStyle("h1", {
      fontWeight: 700,
    }),
    h2: debugStyle("h2", {
      fontWeight: 700,
      [`.${classes.p} + &, .${classes.ul} + &`]: margins.xl,
      [`.${classes.h1} + &`]: margins.xs,
    }),
    h3: debugStyle("h3", {
      fontWeight: 700,
      [`.${classes.h2} + &`]: margins.xs,
      [`.${classes.p} + &`]: margins.xl,
      [`& + .${classes.p}`]: margins.md,
    }),
    h4: debugStyle("h4", {
      fontWeight: 700,
      [`.${classes.p} + &`]: margins.xl,
      [`& + .${classes.p}`]: margins.md,
    }),
    h5: debugStyle("h5", {}),
    h6: debugStyle("h6", {}),

    ul: debugStyle("ul", {
      listStyleType: "disc",
      margin: "1rem",
      listStylePosition: "outside",

      "& > li": {
        paddingLeft: "0.5rem",
      },

      "& > li + li": {
        marginTop: "0.25rem",
      },
    }),

    specialSection: {
      marginTop: 64,
      marginBottom: 64,
    },
    anchorIcon: debugStyle("anchorIcon", {
      marginLeft: "-44px",
      minWidth: "27px",
      maxHeight: "44px",
    }),
    anchorHeaderWrapper: debugStyle("anchorHeaderWrapper", {
      display: "flex",
      [`.${classes.p} + &, .${classes.ul} + &`]: margins.xl,
      "& > button": { opacity: 0, transition: "opacity 0.15s ease-out" },
      "&:hover > button": { opacity: 1 },
    }),
    header: {
      display: "flex",
      alignItems: "center",
    },
    nonBreakable: {
      whiteSpace: "nowrap",
    },
    iframeContainer: {
      marginBlock: "20px",
      position: "relative",
      paddingBottom: "50%",
      height: 0,
    },
    iframe: {
      position: "absolute",
      top: 0,
      left: 0,
      border: 0,
      width: "100%",
      height: "100%",
    },
  };
});

export default useStructuredTextStyles;
