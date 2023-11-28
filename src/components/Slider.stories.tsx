import { Slider as SliderMui, Stack } from "@mui/material";

export const Slider = () => {
  return (
    <Stack spacing={5}>
      <SliderMui defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
    </Stack>
  );
};
export default {
  component: Slider,
  title: " Design system / Components / Slider",
};
