import { Avatars as AvatarsComponent } from "./Avatars";

export const Avatars = () => {
  return (
    <AvatarsComponent
      avatars={[
        {
          url: "https://www.datocms-assets.com/21252/1697710871-woman-picture.png",
          alt: "Woman picture",
        },
        {
          url: "https://www.datocms-assets.com/21252/1697710871-woman-picture.png",
          alt: "Woman picture",
        },
        {
          url: "https://www.datocms-assets.com/21252/1697710871-woman-picture.png",
          alt: "Woman picture",
        },
      ]}
    />
  );
};

export default {
  component: AvatarsComponent,
  title: "App Components / Avatars",
};
