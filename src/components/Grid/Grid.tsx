import * as React from "react";
import { default as MUIGrid } from "@mui/material/Unstable_Grid2";
import { SxProps } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
  sx?: SxProps;
}

/**
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

export const GridContainer = ({ children, sx, ...rest }: Props) => {
  const theme = useTheme();
  return (
    <MUIGrid
      container
      columnSpacing={{
        xxs: "16px",
        xs: "20px",
        sm: "28px",
        md: "36px",
        lg: "40px",
        xl: "48px",
        xxl: "64px",
        xxxl: "64px",
      }}
      sx={{
        [theme.breakpoints.only("xxxl")]: { maxWidth: "1676px" },
        [theme.breakpoints.only("xxl")]: { maxWidth: "1544px" },
        [theme.breakpoints.only("xl")]: { maxWidth: "1152px" },
        [theme.breakpoints.only("lg")]: { maxWidth: "928px" },
        [theme.breakpoints.only("md")]: { maxWidth: "696px" },
        [theme.breakpoints.only("sm")]: { maxWidth: "568px" },
        [theme.breakpoints.only("xs")]: { maxWidth: "424px" },
        [theme.breakpoints.only("xxs")]: { maxWidth: "340px" },
        margin: "0 auto",
        width: "100%",
        ...sx,
      }}
      columns={{ xxxl: 12, xxl: 12, xl: 12, lg: 6, md: 6, sm: 4, xs: 4, xxs: 4 }}
      {...rest}
    >
      {children}
    </MUIGrid>
  );
};

//FIXME: there is probably a more elegant way to do this
interface GridElementProps extends Props {
  xxxl?: number;
  xxl?: number;
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
  xxs?: number;
}

export const GridElement = React.forwardRef<HTMLDivElement, GridElementProps>(
  ({ children, sx, ...rest }, ref) => (
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
  )
);

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
        [theme.breakpoints.only("xl")]: { width: "calc(52px * 4 + 48px * 3)" },
        [theme.breakpoints.only("lg")]: { width: "calc(121px * 3 + 40px * 2)" },
        [theme.breakpoints.only("md")]: { width: "calc(86px * 3 + 36px * 2)" },
        [theme.breakpoints.only("sm")]: { width: "calc(65px * 3 + 35px * 2)" },
        [theme.breakpoints.down("sm")]: { width: "100%" },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default GridContainer;
