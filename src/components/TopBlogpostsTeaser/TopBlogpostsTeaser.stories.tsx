import { TopBlogpostsTeaser } from "./TopBlogpostsTeaser";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/TopBlogpostsTeaser",
  component: TopBlogpostsTeaser,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TopBlogpostsTeaser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    blogposts: [
      {
        __typename: "BlogPostRecord",
        id: "121805521",
        title: "Milk Post",
        slug: "milk-post-en",
        lead: "Milk is a nutrient-rich liquid food produced by the mammary glands of mammals. It is the primary source of nutrition for young mammals (including breastfed human infants) before they are able to digest solid food. Early-lactation milk, which is called colostrum, contains antibodies that strengthen the immune system, and thus reduces the risk of many diseases. Milk contains many other nutrients, including protein and lactose.",
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
          { __typename: "FocusArticleRecord", slug: "bio", title: "Bio", id: "121805523" },
        ],
        publishedDate: "5/24/2022",
      },
      {
        __typename: "BlogPostRecord",
        id: "121948050",
        title: "Potatoes Post",
        slug: "potatoes-post-en",
        lead: "The potato is a starchy tuber of the plant Solanum tuberosum and is a root vegetable native to the Americas. The plant is a perennial in the nightshade family Solanaceae.The potato is a starchy tuber of the plant Solanum tuberosum and is a root vegetable native to the Americas. The plant is a perennial in the nightshade family Solanaceae.",
        image: {
          __typename: "FileField",
          id: "46793968",
          url: "https://www.datocms-assets.com/21252/1653990537-chad-elliott-4o4dngdad8q-unsplash.jpg",
          alt: null,
        },
        markets: [],
        focusArticles: [],
        publishedDate: "5/31/2022",
      },
      {
        __typename: "BlogPostRecord",
        id: "121805523",
        title: "Milk Post",
        slug: "milk-post-en",
        lead: "Milk is a nutrient-rich liquid food produced by the mammary glands of mammals. It is the primary source of nutrition for young mammals (including breastfed human infants) before they are able to digest solid food. Early-lactation milk, which is called colostrum, contains antibodies that strengthen the immune system, and thus reduces the risk of many diseases. Milk contains many other nutrients, including protein and lactose.",
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
          { __typename: "FocusArticleRecord", slug: "bio", title: "Bio", id: "121805523" },
        ],
        publishedDate: "5/24/2022",
      },
    ],
  },
};
