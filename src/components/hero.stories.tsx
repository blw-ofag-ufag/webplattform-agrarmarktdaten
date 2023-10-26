import { Hero as HeroComponent } from "@/components/hero";

export const Hero = () => {
  return <HeroComponent title={"Agricultural Market Data Platform"} />;
};

export const HeroBackgroundIamge = () => {
  return (
    <HeroComponent
      title={"Agricultural Market Data Platform"}
      hero={"linear-gradient(to left, blue, red)"}
    />
  );
};

export default {
  component: Hero,
};
