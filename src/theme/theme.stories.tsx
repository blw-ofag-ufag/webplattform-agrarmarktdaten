import { Table, TableCell, TableHead, useTheme, TableBody, Box } from "@mui/material";
import {
  PaletteBlock,
  StorybookSection,
  StorybookSectionTitle,
  TypographyRowBlock,
} from "./story-blocks";

export const Palette = () => {
  const theme = useTheme();
  return (
    <StorybookSection>
      <StorybookSectionTitle>Palette</StorybookSectionTitle>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          bgcolor: "#fafafa",
        }}
      >
        <PaletteBlock name="cobalt" value={theme.palette.cobalt} />
        <div />
      </Box>
    </StorybookSection>
  );
};

export const Typography = () => (
  <StorybookSection>
    <StorybookSectionTitle>Typography</StorybookSectionTitle>
    <Table>
      <TableHead>
        <TableCell>preview</TableCell>
        <TableCell>desktop</TableCell>
        <TableCell>mobile</TableCell>
      </TableHead>
      <TableBody>
        <TypographyRowBlock variant="body1" />
        <TypographyRowBlock variant="body2" />
        <TypographyRowBlock variant="body3" />
        <TypographyRowBlock variant="caption" />
        <TypographyRowBlock variant="display1" />
        <TypographyRowBlock variant="display2" />
        <TypographyRowBlock variant="h1" />
        <TypographyRowBlock variant="h2" />
        <TypographyRowBlock variant="h3" />
        <TypographyRowBlock variant="h4" />
        <TypographyRowBlock variant="h5" />
        <TypographyRowBlock variant="h6" />
      </TableBody>
    </Table>
  </StorybookSection>
);

export default {
  component: Typography,
  title: "Design System / Theme",
};
