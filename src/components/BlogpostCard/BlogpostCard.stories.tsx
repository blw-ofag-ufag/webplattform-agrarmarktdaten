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

const pigResponsiveImage = {
  __typename: "FileField" as "FileField",
  id: "lexnhUKYSvufT6w73ofQnA",
  alt: null,
  url: "https://www.datocms-assets.com/21252/1698676787-amber-kipp-ewjmbishgxu-unsplash.jpg",
  responsiveImage: {
    __typename: "ResponsiveImage" as "ResponsiveImage",
    sizes: "(max-width: 833px) 100vw, 833px",
    src: "https://www.datocms-assets.com/21252/1698676787-amber-kipp-ewjmbishgxu-unsplash.jpg?auto=format&fit=fill&h=556&w=1096",
    width: 833,
    height: 556,
    alt: null,
    title: null,
    base64:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoICAgLERYLDhgQFQ0WDh0VDRUNFxUZHRYfFiEmJSsjGh0oHRUWJDUlKC0vMjIyGSI4PTcwPCsxMi8BCgsLDg0OHA4KHC8cFhwvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIABEAGAMBIgACEQEDEQH/xAAYAAEAAwEAAAAAAAAAAAAAAAAABAUGAv/EACAQAAEEAQQDAAAAAAAAAAAAAAEAAgMEBQYRNJEhMTP/xAAYAQACAwAAAAAAAAAAAAAAAAABAgADBP/EABcRAQEBAQAAAAAAAAAAAAAAAAACARH/2gAMAwEAAhEDEQA/AJVXB4pljcSBTHYDHWp9g8LMVC8EuMh7XcWaFawQZPSzztLuSurmmsbDJ5eEWQyeoX2LRDZT2iO1SclOg+ZVDa5TkRNJFS7mFERDUf/Z",
  },
};

export const Third: Story = {
  args: {
    __typename: "BlogPostRecord",
    id: "121805521",
    title: "Milk Post",
    slug: "milk-post-en",
    leadCard:
      "Milk is a nutrient-rich liquid food produced by the mammary glands of mammals. It is the primary source of nutrition for young mammals (including breastfed human infants) before they are able to digest solid food. Early-lactation milk, which is called colostrum, contains antibodies that strengthen the immune system, and thus reduces the risk of many diseases. Milk contains many other nutrients, including protein and lactose.",
    image: pigResponsiveImage,
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
    image: pigResponsiveImage,
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
