import { Box, BoxProps, Stack, Typography, useTheme } from "@mui/material";
import { GridContainer as GridContainerComponent, gridColumn, specs } from "./Grid";
import { makeStyles } from "@/components/style-utils";
import { MediaQueryDebug } from "@/components/MediaQueryDebug";

const GridColumn = ({
  xxl,
  xl,
  lg,
  ...rest
}: { xxl: number; xl: number; lg: number } & BoxProps) => {
  const { breakpoints: b } = useTheme();
  return (
    <Box
      sx={{
        [b.down("xxxl")]: gridColumn(xxl),
        [b.down("xl")]: gridColumn(xl),
        [b.down("lg")]: gridColumn(lg),
        ...rest.sx,
      }}
      {...rest}
    />
  );
};

const useStyles = makeStyles()(({ palette: c, spacing: s, typography: t }) => ({
  container: {
    border: "2px solid",
    borderColor: c.red[500],
    paddingTop: s(2),
    paddingBottom: s(2),
    "& > * ": {
      height: 100,
      background: c.cobalt[600],
      fontFamily: t.body1.fontFamily,
      fontSize: t.body1.fontSize,
      color: "white",
      padding: s(2),
      boxSizing: "border-box",
    },
  },
}));

export const GridContainer = () => {
  const { classes } = useStyles();

  return (
    <Stack spacing={2}>
      <MediaQueryDebug />
      <GridContainerComponent className={classes.container}>
        <GridColumn xxl={2} xl={3} lg={1} />
        <GridColumn xxl={4} xl={3} lg={1} />
        <GridColumn xxl={3} xl={3} lg={1} />
        <GridColumn xxl={3} xl={3} lg={1} />
      </GridContainerComponent>

      <GridContainerComponent className={classes.container}>
        <GridColumn xxl={2} xl={3} lg={1} />
        <GridColumn xxl={4} xl={3} lg={1} />
        <GridColumn xxl={3} xl={3} lg={1} />
        <GridColumn xxl={3} xl={3} lg={1} />
      </GridContainerComponent>

      <GridContainerComponent className={classes.container}>
        <GridColumn xxl={6} xl={3} lg={1} />
        <GridColumn xxl={1} xl={3} lg={1} />
        <GridColumn xxl={1} xl={3} lg={1} />
        <GridColumn xxl={4} xl={3} lg={1} />
      </GridContainerComponent>

      <GridContainerComponent className={classes.container}>
        <GridColumn xxl={4} xl={4} lg={1} />
        <GridColumn xxl={4} xl={4} lg={1} />
        <GridColumn xxl={4} xl={4} lg={1} />
      </GridContainerComponent>
    </Stack>
  );
};

export const Audit = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      }}
    >
      {Object.entries(specs).map(([bp, breakpointSpec]) => {
        const { totalWidth, offset, nbColumns, columnGutterWidth, columnWidth } = breakpointSpec;
        const insideWidth =
          nbColumns * columnWidth + (nbColumns - 1) * columnGutterWidth + 2 * offset;

        // Two keys that must be added by storbyook
        if (bp === "displayName" || bp === "__docgenInfo") {
          return null;
        }
        return (
          <div key={bp}>
            <Typography variant="h5">{bp}</Typography>
            <Typography variant="body1">inside width {insideWidth}px</Typography>
            <Typography variant="body1">total width {totalWidth}px</Typography>
            <Typography variant="body1">
              insideWidth == totalWidth ? {insideWidth === totalWidth ? `✅` : `❌`}
            </Typography>
            <pre>{JSON.stringify(breakpointSpec, null, 2)}</pre>
          </div>
        );
      })}
    </Box>
  );
};

export default {
  component: GridContainerComponent,
};
