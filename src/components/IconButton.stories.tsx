import { Download } from "@/icons/icons-jsx/control";
import { StorybookSection, StorybookSectionTitle, ComponentBlock } from "@/theme/story-blocks";
import { IconButton as MUIIconButton, Stack } from "@mui/material";

export const IconButton = () => (
  <StorybookSection>
    <StorybookSectionTitle>IconButton</StorybookSectionTitle>
    <Stack spacing={4} direction="row">
      <ComponentBlock title="Size: small">
        <MUIIconButton size="small">
          <Download />
        </MUIIconButton>
      </ComponentBlock>
      <ComponentBlock title="Size: default">
        <MUIIconButton>
          <Download />
        </MUIIconButton>
      </ComponentBlock>
      <ComponentBlock title="Size: large">
        <MUIIconButton size="large">
          <Download />
        </MUIIconButton>
      </ComponentBlock>
    </Stack>
  </StorybookSection>
);

export default {
  component: IconButton,
  title: "Design System / Components / IconButton",
};
