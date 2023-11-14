import { BlogpostCard } from "./BlogpostCard";

import type { Meta } from "@storybook/react";
import { milkBlogPost, milkBlogPostWithSuperLongTitle } from "@/mocks/blog-posts";
import { Box } from "@mui/material";

const meta = {
  title: "Components/BlogpostCard",
  component: BlogpostCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof BlogpostCard>;

export default meta;

export const Third = () => {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2rem" }}>
      <BlogpostCard variant="third" {...milkBlogPost} />
      <BlogpostCard variant="third" {...{ ...milkBlogPost, leadCard: "Not much" }} />
      <BlogpostCard variant="third" {...milkBlogPostWithSuperLongTitle} />
      <BlogpostCard
        variant="third"
        {...{
          ...milkBlogPost,
          title: "Test_Dairy Milk Price Index reaches record level",
          leadCard: "Missing translation",
        }}
      />
    </Box>
  );
};

export const Full = () => {
  return <BlogpostCard variant="full" {...milkBlogPostWithSuperLongTitle} />;
};
