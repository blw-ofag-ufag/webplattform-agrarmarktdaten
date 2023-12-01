import * as React from "react";
import { SxProps, useMediaQuery } from "@mui/material";

import { Breakpoint, Theme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { makeStyles } from "@/components/style-utils";
import theme from "@/theme/blw";

interface Props {
  children: React.ReactNode;
  sx?: SxProps;
  className?: string;
}

type BreakpointSpec = {
  totalWidth: number;
  offset: number;
  nbColumns: number;

  rowGutterWidth: number;
  columnWidth: number;
  columnGutterWidth: number;
};

/**
 * Definitions from Sketch file
 * @see https://www.sketch.com/s/81803335-dd26-42f1-a505-6845270a91b7/p/6000F394-096F-4CAD-96D6-3F8056F9DE4B/canvas
 */
export const specs: Record<Breakpoint, BreakpointSpec> = {
  // Desktop
  xxxl: {
    totalWidth: 1676,
    offset: 0,
    nbColumns: 12,
    columnGutterWidth: 64,
    columnWidth: 81,
    rowGutterWidth: 64,
  },

  xxl: {
    totalWidth: 1544,
    offset: 0,
    nbColumns: 12,
    columnGutterWidth: 64,
    columnWidth: 70,
    rowGutterWidth: 40,
  },

  // Tablet
  xl: {
    totalWidth: 1280,
    offset: 64,
    nbColumns: 12,
    columnGutterWidth: 48,
    columnWidth: 52,
    rowGutterWidth: 40,
  },

  lg: {
    totalWidth: 1024,
    offset: 49,
    nbColumns: 6,
    columnGutterWidth: 40,
    columnWidth: 121,
    rowGutterWidth: 40,
  },

  md: {
    totalWidth: 768,
    offset: 36,
    nbColumns: 6,
    columnGutterWidth: 36,
    columnWidth: 86,
    rowGutterWidth: 40,
  },

  // Mobile
  sm: {
    totalWidth: 640,
    offset: 35,
    nbColumns: 6,
    columnGutterWidth: 36,
    columnWidth: 65,
    rowGutterWidth: 40,
  },

  xs: {
    totalWidth: 480,
    offset: 28,
    nbColumns: 4,
    columnGutterWidth: 28,
    columnWidth: 85,
    rowGutterWidth: 40,
  },

  xxs: {
    totalWidth: 380,
    offset: 20,
    nbColumns: 4,
    columnGutterWidth: 20,
    columnWidth: 70,
    rowGutterWidth: 40,
  },
};

export const useIsDesktop = () => useMediaQuery(theme.breakpoints.up("xl"));
export const useIsTablet = () => useMediaQuery(theme.breakpoints.between("md", "xl"));
export const useIsMobile = () => useMediaQuery(theme.breakpoints.down("md"));

export const vars = {
  offset: "--BLWGrid-offset",
  columnWidth: "--BLWGrid-columnWidth",
  columnGutterWidth: "--BLWGrid-columnGutterWidth",
  rowGutterWidth: "--BLWGrid-rowGutterWidth",
};

export const gridColumn = (offsetOrSpan: number, spanOrUndefined?: number) => {
  const span = spanOrUndefined === undefined ? offsetOrSpan : spanOrUndefined;
  const offset = spanOrUndefined === undefined ? 0 : offsetOrSpan;

  return {
    flexShrink: 0,
    width: `calc( ${span} * var(${vars.columnWidth}) + ${span - 1} * var(${
      vars.columnGutterWidth
    }))`,
    marginLeft:
      spanOrUndefined !== undefined
        ? `calc( ${offset} * var(${vars.columnWidth}) + ${offset - 1} * var(${
            vars.columnGutterWidth
          }))`
        : undefined,
  };
};

const useStyles = makeStyles<{ disableItemMargin?: boolean }>()((theme, { disableItemMargin }) => {
  const specEntries = Object.entries(specs);
  const gridResponsive = Object.fromEntries(
    specEntries.map(([bp, values]) => {
      return [
        theme.breakpoints.only(bp as Breakpoint),
        {
          maxWidth: values.totalWidth,
          boxSizing: "border-box",
          [vars.offset]: `${values.offset}px`,
          [vars.columnWidth]: `${values.columnWidth}px`,
          [vars.columnGutterWidth]: `${values.columnGutterWidth}px`,
          [vars.rowGutterWidth]: `${values.rowGutterWidth}px`,
        },
      ];
    })
  );

  return {
    grid: {
      display: "flex",
      marginLeft: "auto",
      marginRight: "auto",
      width: "100%",
      paddingLeft: `var(${vars.offset})`,
      paddingRight: `var(${vars.offset})`,
      position: "relative",
      zIndex: 1,
      "&& > * + *": disableItemMargin
        ? {}
        : {
            marginLeft: `var(${vars.columnGutterWidth})`,
          },
      ...gridResponsive,
    },
  };
});

const useGridStyles = makeStyles()({
  grid: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: `var(${vars.columnGutterWidth})`,
    rowGap: `var(${vars.rowGutterWidth})`,
  },
});

export const useGridElementStyles = makeStyles<{ full?: boolean | undefined }>()(
  (theme, { full }) => ({
    gridElement: {
      textDecoration: "none",
      [theme.breakpoints.up("xl")]: gridColumn(full ? 12 : 4),
      [theme.breakpoints.between("md", "xl")]: gridColumn(full ? 6 : 3),
      [theme.breakpoints.between("sm", "md")]: gridColumn(6),
      [theme.breakpoints.down("sm")]: gridColumn(4),
    },
  })
);

export const GridContainer = ({
  children,
  className,
  disableItemMargin,
  ...rest
}: Props & { disableItemMargin?: boolean }) => {
  const { classes, cx } = useStyles({ disableItemMargin });

  return (
    <Box className={cx(classes.grid, className)} {...rest}>
      {children}
    </Box>
  );
};

export const GridWrap = ({ children, sx, ...rest }: Props) => {
  const { classes } = useGridStyles();
  return (
    <Box {...rest} className={classes.grid} sx={sx}>
      {children}
    </Box>
  );
};

export const GridWrapElement = ({ children, sx, full, ...rest }: Props & { full?: boolean }) => {
  const { classes } = useGridElementStyles({ full });
  return (
    <Box {...rest} className={classes.gridElement} sx={sx}>
      {children}
    </Box>
  );
};

/**
 * For compatibility with swiss-federal-ci. Return value should be passed to ContentWrapperProps,
 * for swiss-federal-ci ContentWrapper to use the same grid system as BLW.
 */
export const makeContentWrapperSx = (theme: Theme) => {
  const getSxForBreakpoint = (bp: Breakpoint) => {
    const spec = specs[bp];
    return {
      "&&": {
        maxWidth: `${spec.totalWidth}px`,
        paddingX: `${spec.offset}px`,
      },
    };
  };
  const sx = Object.fromEntries(
    Object.keys(specs).map((bp_) => {
      const bp = bp_ as Breakpoint;
      return [theme.breakpoints.only(bp), getSxForBreakpoint(bp)];
    })
  );
  sx[theme.breakpoints.down("xxs")] = getSxForBreakpoint("xxs");
  sx[theme.breakpoints.up("xxxl")] = getSxForBreakpoint("xxxl");
  return sx;
};
