import { ScrollToTop } from "./ScrollToTop";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "App Components / ScrollToTop",
  component: ScrollToTop,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {},
  decorators: [
    (Story) => {
      return <Story />;
    },
  ],
} satisfies Meta<typeof ScrollToTop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
