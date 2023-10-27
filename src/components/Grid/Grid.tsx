import * as React from "react";
import { SxProps } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { default as MUIGrid } from "@mui/material/Unstable_Grid2";

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
    gutterWidth: number;
    columnWidth: number;
  }
> = {
  xxxl: {
    totalWidth: 1676,
    offset: 0,
    nbColumns: 12,
    gutterWidth: 64,
    columnWidth: 81,
  },

  xxl: {
    totalWidth: 1544,
    offset: 0,
    nbColumns: 12,
    gutterWidth: 64,
    columnWidth: 70,
  },

  xl: {
    totalWidth: 1152,
    offset: 64,
    nbColumns: 12,
    gutterWidth: 48,
    columnWidth: 52,
  },

  lg: {
    totalWidth: 928,
    offset: 48,
    nbColumns: 6,
    gutterWidth: 40,
    columnWidth: 121,
  },

  md: {
    totalWidth: 696,
    offset: 36,
    nbColumns: 6,
    gutterWidth: 36,
    columnWidth: 86,
  },

  sm: {
    totalWidth: 568,
    offset: 36,
    nbColumns: 6,
    gutterWidth: 36,
    columnWidth: 65,
  },

  xs: {
    totalWidth: 424,
    offset: 28,
    nbColumns: 4,
    gutterWidth: 28,
    columnWidth: 85,
  },

  xxs: {
    totalWidth: 340,
    offset: 20,
    nbColumns: 4,
    gutterWidth: 20,
    columnWidth: 70,
  },
};

export const vars = {
  offset: "--BLWGrid-offset",
  columnWidth: "--BLWGrid-columnWidth",
  gutterWidth: "--BLWGrid-gutterWidth",
};

export const gridColumn = (offsetOrSpan: number, spanOrUndefined?: number) => {
  const span = spanOrUndefined === undefined ? offsetOrSpan : spanOrUndefined;
  const offset = spanOrUndefined === undefined ? 0 : offsetOrSpan;

  return {
    flexShrink: 0,
    width: `calc( ${span} * var(${vars.columnWidth}) + ${span - 1} * var(${vars.gutterWidth}))`,
    marginLeft: spanOrUndefined !== undefined ? `calc( ${offset} * var(${vars.offset}))` : null,
  };
};

/*
 * BREAKPOINTS FOR REFERENCE
  xxs: 380,
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1544,
  xxxl: 1920,
 */

const useStyles = makeStyles<{ disableItemMargin?: boolean }>()((theme, { disableItemMargin }) => {
  const specEntries = Object.entries(specs);
  const gridResponsive = Object.fromEntries(
    specEntries.map(([bp, values]) => {
      return [
        theme.breakpoints.only(bp as Breakpoint),
        {
          maxWidth: values.totalWidth,
          [vars.offset]: `${values.offset}px`,
          [vars.columnWidth]: `${values.columnWidth}px`,
          [vars.gutterWidth]: `${values.gutterWidth}px`,
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
            marginLeft: `var(${vars.gutterWidth})`,
          },
      ...gridResponsive,
    },
  };
});

export const NewGridContainer = ({
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
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        [theme.breakpoints.up("xxl")]: { columnGap: "64px", rowGap: "40px" },
        [theme.breakpoints.only("xl")]: { columnGap: "48px", rowGap: "32px" },
        [theme.breakpoints.only("lg")]: { columnGap: "40px", rowGap: "32px" },
        [theme.breakpoints.only("md")]: { columnGap: "36px", rowGap: "32px" },
        [theme.breakpoints.only("sm")]: { columnGap: "35px", rowGap: "32px" },
        [theme.breakpoints.down("sm")]: { rowGap: "32px" },
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
        [theme.breakpoints.only("xxxl")]: { width: "calc(81px * 4 + 64px * 3)" },
        [theme.breakpoints.only("xxl")]: { width: "calc(70px * 4 + 64px * 3)" },
        [theme.breakpoints.only("xl")]: {
          width: "calc(((100% - 48px * 11) / 12) * 4 + 48px * 3)",
        },
        [theme.breakpoints.only("lg")]: {
          width: "calc(((100% - 40px * 11) / 12) * 4 + 40px * 3)",
        },
        [theme.breakpoints.only("md")]: {
          width: "calc(((100% - 36px * 11) / 12) * 4 + 36px * 3)",
        },
        [theme.breakpoints.only("sm")]: {
          width: "calc(((100% - 35px * 11) / 12) * 4 + 35px * 3)",
        },
        [theme.breakpoints.down("sm")]: { width: "100%" },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
