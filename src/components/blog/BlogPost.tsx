import { Box, Chip, Link, Typography } from "@mui/material";
import { head } from "lodash";
import Image from "next/image";
import NextLink from "next/link";

import * as GQL from '@/graphql'
import { useLocale } from "@/lib/use-locale";


import Flex from "../flex";

const WIDTH = 310;
const IMAGE_HEIGHT = WIDTH * (9 / 16);

export const BlogPostsGrid = (props: { blogPosts: GQL.BlogPostRecord[] }) => {
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

export const BlogPostTile = (props:  GQL.BlogPostRecord) => {
  const { title, lead, image, markets, slug, _firstPublishedAt } = props;
  const mainMarket = head(markets);
  const locale = useLocale();

  return (
    <NextLink href="/blog/[slug]" as={`/blog/${slug}`} locale={locale} passHref>
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
            <Image src={image!.url as string} layout="fill" alt={image!.alt as string} />
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
              <Chip variant="outlined" label={_firstPublishedAt} />
            )}
          </Flex>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="body2" mt={2}>
            {lead}
          </Typography>
        </Box>
      </Link>
    </NextLink>
  );
};
