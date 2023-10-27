import { BlogpostCard } from "./BlogpostCard";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/BlogpostCard",
  component: BlogpostCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof BlogpostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Third: Story = {
  args: {
    __typename: "BlogPostRecord",
    id: "121805521",
    title: "Milk Post",
    slug: "milk-post-en",
    leadCard:
      "Milk is a nutrient-rich liquid food produced by the mammary glands of mammals. It is the primary source of nutrition for young mammals (including breastfed human infants) before they are able to digest solid food. Early-lactation milk, which is called colostrum, contains antibodies that strengthen the immune system, and thus reduces the risk of many diseases. Milk contains many other nutrients, including protein and lactose.",
    image: {
      __typename: "FileField",
      id: "46793926",
      url: "https://www.datocms-assets.com/21252/1653990333-brian-suman-vdbq-iiyvgy-unsplash.jpg",
      alt: null,
    },
    markets: [
      { __typename: "MarketArticleRecord", title: "Bio", slug: "bio", id: "121805521" },
      { __typename: "MarketArticleRecord", title: "Milk", slug: "milk", id: "121805522" },
    ],
    focusArticles: [
      { __typename: "FocusArticleRecord", slug: "bio", title: "Bio", id: "121805521" },
    ],
    publishedDate: "5/24/2022",
  },
};

export const Full: Story = {
  args: {
    variant: "full",
    __typename: "BlogPostRecord",
    id: "121805521",
    title: "Milk Post",
    slug: "milk-post-en",
    leadCard:
      "Milk is a nutrient-rich liquid food produced by the mammary glands of mammals. It is the primary source of nutrition for young mammals (including breastfed human infants) before they are able to digest solid food. Early-lactation milk, which is called colostrum, contains antibodies that strengthen the immune system, and thus reduces the risk of many diseases. Milk contains many other nutrients, including protein and lactose.",
    image: {
      __typename: "FileField",
      id: "46793926",
      url: "https://www.datocms-assets.com/21252/1653990333-brian-suman-vdbq-iiyvgy-unsplash.jpg",
      alt: null,
    },
    markets: [
      { __typename: "MarketArticleRecord", title: "Bio", slug: "bio", id: "121805521" },
      { __typename: "MarketArticleRecord", title: "Milk", slug: "milk", id: "121805522" },
    ],
    focusArticles: [
      { __typename: "FocusArticleRecord", slug: "bio", title: "Bio", id: "121805521" },
    ],
    publishedDate: "5/24/2022",
  },
};
