import { Box, Chip, Link, Typography } from "@mui/material";
import { head } from "lodash";
import Image from "next/image";
import NextLink from "next/link";
import { StructuredText } from "@/components/StructuredText";

import * as GQL from "@/graphql";
import { useLocale } from "@/lib/use-locale";

import Flex from "../flex";

const WIDTH = 310;
const IMAGE_HEIGHT = WIDTH * (9 / 16);

interface Props {
  blogPosts: GQL.SimpleBlogPostFragment[];
}

export const BlogPostsGrid = (props: Props) => {
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

export const BlogPostTile = (props: GQL.SimpleBlogPostFragment) => {
  const { title, cardSummary, image, markets, slug, publishedDate } = props;
  const mainMarket = head(markets);
  const locale = useLocale();

  return (
    <NextLink href="/blog/[slug]" as={`/blog/${slug}`} locale={locale} passHref legacyBehavior>
      <Link sx={{ textDecoration: "none" }}>
        <Box sx={{ width: WIDTH }}>
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              height: IMAGE_HEIGHT,
              borderRadius: "10px",
            }}
          >
            {image?.url && <Image src={image?.url} layout="fill" alt={image?.alt ?? ""} />}
          </Box>
          <Flex
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              my: 4,
            }}
          >
            {mainMarket && <Chip label={mainMarket.title} />}
            {publishedDate && <Chip variant="outlined" label={publishedDate} />}
          </Flex>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="body2" mt={2}>
            {cardSummary && <StructuredText data={cardSummary} />}
          </Typography>
        </Box>
      </Link>
    </NextLink>
  );
};
