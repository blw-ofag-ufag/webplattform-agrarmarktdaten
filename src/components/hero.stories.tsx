import { Hero as HeroComponent } from "@/components/hero";
import { Typography } from "@mui/material";

export const Hero = () => {
  return (
    <>
      <HeroComponent title={"Agricultural Market Data Platform"} />
      <Typography variant="display2">Hello</Typography>
    </>
  );
};

export const HeroBackgroundIamge = () => {
  return (
    <HeroComponent
      title={"Agricultural Market Data Platform"}
      hero={"https://www.datocms-assets.com/21252/1698309686-1695737332-homepage_background.jpg"}
      color="white"
    />
  );
};

export default {
  component: Hero,
  title: "App Components / Hero",
};
