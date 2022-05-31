import { Box, Chip, Grid, Typography } from "@mui/material";
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
    <Grid container spacing={2} columns={{ xs: 1, sm: 2, md: 3 }}>
      {blogPosts.map((d, i) => (
        <BlogPostTile key={i} {...d} />
      ))}
    </Grid>
  );
};

export const BlogPostTile = (props: BlogPostPreview) => {
  const { title, lead, image, markets, _firstPublishedAt } = props;
  const mainMarket: BlogPost["markets"][number] | undefined = markets[0];

  return (
    <Grid item>
      <Box
        sx={{
          width: WIDTH,
        }}
      >
        <Box
          sx={{
            overflow: "hidden",
            height: IMAGE_HEIGHT,
            borderRadius: "10px",
          }}
        >
          <Image
            src={image.url}
            width={WIDTH}
            height={IMAGE_HEIGHT}
            alt={image.alt}
          />
        </Box>
        <Flex
          sx={{ alignItems: "center", justifyContent: "space-between", my: 4 }}
        >
          {mainMarket && <Chip label={mainMarket.title} />}
          {_firstPublishedAt && (
            <Chip label={new Date(_firstPublishedAt).toLocaleDateString()} />
          )}
        </Flex>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" mt={2}>
          {lead}
        </Typography>
      </Box>
    </Grid>
  );
};
