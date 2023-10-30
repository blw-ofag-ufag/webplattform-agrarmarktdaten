import * as React from "react";
import { SxProps } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { Breakpoint, useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { makeStyles } from "@/components/style-utils";

interface Props {
  children: React.ReactNode;
  sx?: SxProps;
  className?: string;
}

/**
 * Definitions from Sketch file
 * @see https://www.sketch.com/s/81803335-dd26-42f1-a505-6845270a91b7/p/6000F394-096F-4CAD-96D6-3F8056F9DE4B/canvas
 */
const specs: Record<
  Breakpoint,
  {
    totalWidth: number;
    offset: number;
    nbColumns: number;

    rowGutterWidth: number;
    columnWidth: number;
    columnGutterWidth: number;
  }
> = {
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

  xl: {
    totalWidth: 1280,

    // Not 64 since there seems to be a rounding error somewhere
    offset: 63,

    nbColumns: 12,
    columnGutterWidth: 48,
    columnWidth: 52,
    rowGutterWidth: 40,
  },

  lg: {
    totalWidth: 1024,
    offset: 48,
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

  sm: {
    totalWidth: 640,
    offset: 36,
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
        : null,
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

export const GridElement = React.forwardRef<
  HTMLDivElement,
  Props & Partial<Record<Breakpoint, number>>
>(({ children, sx, ...rest }, ref) => (
  <Grid
    ref={ref}
    component="div"
    xxxl={12}
    xxl={12}
    xl={12}
    lg={6}
    md={6}
    sm={4}
    xs={4}
    xxs={4}
    sx={{ padding: 0, ...sx }}
    {...rest}
  >
    {children}
  </Grid>
));

export const GridWrap = ({ children, sx, ...rest }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        columnGap: `var(${vars.columnGutterWidth})`,
        rowGap: `var(${vars.rowGutterWidth})`,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export const GridWrapElement = ({ children, sx, ...rest }: Props) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        textDecoration: "none",
        [theme.breakpoints.between("xl", "xxxl")]: gridColumn(4),
        [theme.breakpoints.only("lg")]: gridColumn(2),
        [theme.breakpoints.down("md")]: {
          width: "100%",
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
