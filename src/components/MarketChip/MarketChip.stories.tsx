import { MarketChip } from "./";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "App Components / MarketChip",
  component: MarketChip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MarketChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Milk: Story = {
  args: {
    slug: "milk",
    label: "Milk",
  },
};

export const MilkSub: Story = {
  args: {
    slug: "milk-and-meat-substitutes",
    label: "Meat substitutes",
  },
};

export const Fruit: Story = {
  args: {
    slug: "fruits-and-vegetables",
    label: "Fruit",
  },
};
export const Meat: Story = {
  args: {
    slug: "meat",
    label: "Meat",
  },
};

export const Cereals: Story = {
  args: {
    slug: "bread-and-cereals",
    label: "Cereals",
  },
};

export const Eggs: Story = {
  args: {
    slug: "eggs",
    label: "Eggs",
  },
};

export const Feed: Story = {
  args: {
    slug: "feed",
    label: "Feed",
  },
};

export const Potatoes: Story = {
  args: {
    slug: "potatoes",
    label: "Potatoes",
  },
};

export const Oils: Story = {
  args: {
    slug: "oil-seeds",
    label: "Oil seeds",
  },
};

export const Default: Story = {
  args: {
    slug: "default",
    label: "Default",
  },
};
