import * as React from "react";
import { Box, Chip, Typography } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { e, s, c, t } from "@interactivethings/swiss-federal-ci";
import { i18n } from "@lingui/core";

import * as GQL from "@/graphql";
import { useLocale } from "@/lib/use-locale";

import Flex from "../flex";

export const BlogpostCard = (props: GQL.SimpleBlogPostFragment) => {
  const { title, lead, image, markets, slug, _firstPublishedAt } = props;
  const locale = useLocale();

  return (
    <NextLink href="/blog/[slug]" as={`/blog/${slug}`} locale={locale} passHref legacyBehavior>
      <Box sx={{ maxWidth: "100%", boxShadow: e[6], borderRadius: s(2), pb: s(9) }}>
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            maxWidth: "100%",
            aspectRatio: 16 / 9,
            borderTopLeftRadius: s(2),
            borderTopRightRadius: s(2),
          }}
        >
          {image?.url && <Image src={image?.url} fill alt={image?.alt ?? ""} />}
        </Box>
        <Flex
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            px: s(7),
            mt: s(9),
            mb: s(4),
          }}
        >
          {_firstPublishedAt && (
            <Typography variant="body2" sx={{ color: c.monochrome[500] }}>
              {i18n.date(_firstPublishedAt, { year: "numeric", month: "long", day: "numeric" })}
            </Typography>
          )}
        </Flex>
        <Typography variant="body2" sx={{ color: c.monochrome[800], px: s(7), typography: t.h1 }}>
          {title}
        </Typography>
        <Flex sx={{ px: s(7), mt: s(4) }}>
          {markets.length > 0 && (
            <Box sx={{ display: "flex", columnGap: s(4), rowGap: s(2), flexWrap: "wrap" }}>
              {markets.map((market) => {
                return <Chip key={market.title} label={market.title} />;
              })}
            </Box>
          )}
        </Flex>
        <Typography
          variant="body2"
          mt={2}
          sx={{
            color: c.monochrome[800],
            px: s(7),
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "4",
            lineClamp: "4",
            WebkitBoxOrient: "vertical",
          }}
        >
          {lead}
        </Typography>
      </Box>
    </NextLink>
  );
};

export default BlogpostCard;
