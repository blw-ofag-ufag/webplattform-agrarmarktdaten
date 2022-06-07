import { Box, Chip, Typography } from "@mui/material";
import { head } from "lodash";
import Image from "next/image";

import { BlogPost } from "@/domain/types";

import Flex from "../flex";

const WIDTH = 310;
const IMAGE_HEIGHT = WIDTH * (9 / 16);

type BlogPostPreview = Pick<
  BlogPost,
  "title" | "lead" | "image" | "markets" | "_firstPublishedAt"
>;

export const BlogPostsGrid = (props: { blogPosts: BlogPostPreview[] }) => {
  const { blogPosts } = props;

  return (
    <Flex
      sx={{
        flexWrap: "wrap",
        gap: 6,
      }}
    >
      {blogPosts.map((d, i) => (
        <BlogPostTile key={i} {...d} />
      ))}
    </Flex>
  );
};

export const BlogPostTile = (props: BlogPostPreview) => {
  const { title, lead, image, markets, _firstPublishedAt } = props;
  const mainMarket = head(markets);

  return (
    <Box sx={{ width: WIDTH }}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          height: IMAGE_HEIGHT,
          borderRadius: "10px",
        }}
      >
        <Image src={image.url} layout="fill" alt={image.alt} />
      </Box>
      <Flex
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          my: 4,
        }}
      >
        {mainMarket && <Chip label={mainMarket.title} />}
        {_firstPublishedAt && (
          <Chip
            variant="outlined"
            label={new Date(_firstPublishedAt).toLocaleDateString()}
          />
        )}
      </Flex>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body2" mt={2}>
        {lead}
      </Typography>
    </Box>
  );
};
