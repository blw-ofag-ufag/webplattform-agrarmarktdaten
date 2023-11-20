import { Pagination } from "./";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "App Components / Pagination",
  component: Pagination,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    total: 10,
    current: 1,
    onChange: () => {},
  },
};
