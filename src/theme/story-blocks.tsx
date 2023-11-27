import { makeStyles } from "@/components/style-utils";
import { ResponsiveFontMediaQueries, makeResponsiveFontMediaQueries } from "@/theme/federal";
import { FederalColor } from "@/theme/federal/theme-augmentation";
import {
  Typography as MuiTypography,
  Box,
  Stack,
  TableCell,
  useTheme,
  TableRow,
  TypographyProps,
  Color,
  rgbToHex,
} from "@mui/material";

const useStyles = makeStyles()(({ palette: c }) => ({
  swatch: {
    border: "0px solid",
    borderColor: c.grey[600],
    overflow: "hidden",
    borderRadius: "4px",
    width: 80,
    marginBottom: 1,
    backgroundColor: "#F2F2F2",
  },

  swatchColor: {
    height: 63,
    margin: "1px",
    display: "block",
    borderRadius: "4px",
  },

  typography: {
    alignItems: "center",
    display: "flex",
    margin: [0, 1],
    fontSize: 8,
    lineHeight: "12px",
  },
}));

type FederalThemeFontSpec = {
  fontSize: number;
  lineHeight: number;
};

type ResponsiveFederalThemeFontSpec = Record<
  ResponsiveFontMediaQueries[keyof ResponsiveFontMediaQueries],
  FederalThemeFontSpec
>;

export const TypographyRowBlock = ({
  variant,
}: {
  variant: Exclude<TypographyProps["variant"], undefined | "tag" | "inherit">;
}) => {
  const theme = useTheme();
  const responsiveSpec = theme.typography[variant] as ResponsiveFederalThemeFontSpec;
  const mediaQueries = makeResponsiveFontMediaQueries(theme);
  const mobileSpec = responsiveSpec[mediaQueries.mobile] as FederalThemeFontSpec;
  const desktopSpec = responsiveSpec[mediaQueries.desktop] as FederalThemeFontSpec;
  if (!mobileSpec || !desktopSpec) {
    return (
      <MuiTypography color="error" variant="body2">
        Variant {variant} is lacking mobile or desktop spec
      </MuiTypography>
    );
  }
  return (
    <TableRow>
      <TableCell>
        <MuiTypography variant={variant} display="block">
          {variant}
        </MuiTypography>
      </TableCell>
      <TableCell>
        {desktopSpec.fontSize} / {desktopSpec.lineHeight}
      </TableCell>

      <TableCell>
        {mobileSpec.fontSize} / {mobileSpec.lineHeight}
      </TableCell>
    </TableRow>
  );
};

export const StorybookSection = ({ children }: { children: React.ReactNode }) => {
  return <Stack spacing={2}>{children}</Stack>;
};

export const StorybookSectionTitle = ({ children }: { children: React.ReactNode }) => {
  return <MuiTypography variant="h3">{children}</MuiTypography>;
};

export const ComponentBlock = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
}) => {
  return (
    <div>
      <MuiTypography variant="h5" gutterBottom>
        {title}
      </MuiTypography>

      {children}
    </div>
  );
};

export const PaletteBlock = ({ name, value }: { name: string; value: Color | FederalColor }) => {
  const { classes } = useStyles();
  if (typeof value === "object") {
    const keys = Object.keys(value);

    return (
      <Box sx={{ p: 1 }}>
        <MuiTypography variant="h5" gutterBottom>
          {name}
        </MuiTypography>
        <Box
          sx={{
            display: "grid",
            gap: "0.5rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(5rem, 1fr))",
          }}
        >
          {keys.map((k) => {
            const v = value[k as unknown as keyof typeof value];
            return (
              <Box key={k} className={classes.swatch}>
                <Box className={classes.swatchColor} sx={{ backgroundColor: v }} />
                <MuiTypography variant="caption" display="block" className={classes.typography}>
                  {k}
                  <br />
                  {rgbToHex(v)}
                </MuiTypography>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  } else {
    return <>{value}</>;
  }
};
