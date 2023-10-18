import * as React from "react";
import { Box, Typography } from "@mui/material";
import NextLink from "next/link";
import { e, s, c, t } from "@interactivethings/swiss-federal-ci";
import { i18n } from "@lingui/core";
import * as GQL from "@/graphql";
import { useLocale } from "@/lib/use-locale";
import { Image } from "react-datocms";
import { MarketChip } from "@/components/MarketChip";
import { useTheme } from "@mui/material/styles";

import Flex from "../flex";

export const BlogpostCard = (
  props: GQL.SimpleBlogPostFragment & { variant?: "full" | "half" | "third" }
) => {
  const {
    title,
    lead,
    image,
    markets,
    focusArticles,
    slug,
    publishedDate,
    variant = "third",
  } = props;
  const locale = useLocale();
  const titleRef = React.useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const [titleHeight, setTitleHeight] = React.useState(0);

  React.useEffect(() => {
    function updateSize() {
      if (titleRef?.current?.clientHeight && titleRef.current?.clientHeight > 0) {
        setTitleHeight(titleRef.current?.clientHeight);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [setTitleHeight]);

  if (variant === "full") {
    return (
      <NextLink href="/blog/[slug]" as={`/blog/${slug}`} locale={locale} passHref legacyBehavior>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            minWidth: "100%",
            borderRadius: s(2),
            backgroundColor: "#FFF",
            boxShadow: e[6],
            cursor: "pointer",
            height: "100%",
            minHeight: "556px",
            maxHeight: "556px",
          }}
        >
          {image?.responsiveImage && (
            // <Image
            //   src={image?.url}
            //   width={width}
            //   height={300}
            //   style={{
            //     objectFit: "cover",
            //     borderTopLeftRadius: s(2),
            //     borderBottomLeftRadius: s(2),
            //     minWidth: "66.6%",
            //     width: "66.6%",
            //     height: "auto",
            //   }}
            //   alt={image?.alt ?? ""}
            // />
            <Image data={image?.responsiveImage} layout="fixed" style={{ height: "100%" }} />
          )}
          <Box
            sx={{
              pr: s(20),
              pl: s(16),
              pt: s(10),
              width: "100%",
              overflowY: "hidden",
              height: "100%",
            }}
          >
            {publishedDate && (
              <Typography variant="body2" sx={{ color: c.monochrome[500] }}>
                {i18n.date(publishedDate, { year: "numeric", month: "long", day: "numeric" })}
              </Typography>
            )}
            <Typography
              ref={titleRef}
              variant="body2"
              sx={{
                lineHeight: "48px",
                mt: s(4),
                fontWeight: 700,
                color: c.monochrome[800],
                typography: t.h1,
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "3",
                lineClamp: "3",
                WebkitBoxOrient: "vertical",
              }}
            >
              {title}
            </Typography>
            <Box
              sx={{ mt: s(4), display: "flex", columnGap: s(4), rowGap: s(2), flexWrap: "wrap" }}
            >
              {[...markets, ...focusArticles].slice(0, 2).map(({ slug, title }) => (
                <MarketChip key={slug} slug={slug} label={title} />
              ))}
            </Box>
            <Box sx={{ pt: s(4) }}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "18px",
                  color: c.monochrome[800],
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "7",
                  lineClamp: "7",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {lead}
              </Typography>
            </Box>
          </Box>
        </Box>
      </NextLink>
    );
  }

  if (variant === "half") {
    return null;
  }

  if (variant === "third") {
    return (
      <NextLink href="/blog/[slug]" as={`/blog/${slug}`} locale={locale} passHref legacyBehavior>
        <Box
          sx={{
            maxWidth: "100%",
            boxShadow: e[6],
            borderRadius: s(2),
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              minWidth: "100%",
              aspectRatio: 16 / 9,
              borderTopLeftRadius: s(2),
              borderTopRightRadius: s(2),
            }}
          >
            {/* {image?.url && (
              <Image
                src={image?.url}
                width={width}
                height={300}
                style={{
                  objectFit: "cover",
                  aspectRatio: 16 / 9,
                  minWidth: "100%",
                  width: "100%",
                  height: "auto",
                }}
                alt={image?.alt ?? ""}
              />
            )} */}
            {image?.responsiveImage && (
              <Box sx={{ maxHeight: "280px", height: "100%" }}>
                <Image data={image?.responsiveImage} layout="fill" />
              </Box>
            )}
          </Box>

          <Box
            sx={{
              pb: s(9),
              pt: s(9),
              display: "flex",
              flexDirection: "column",
              minHeight: "302px",
              maxHeight: "302px",
              height: "100%",
            }}
          >
            <Flex
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                px: s(7),

                mb: s(4),
              }}
            >
              {publishedDate && (
                <Typography variant="body2" sx={{ color: c.monochrome[500], mt: 0 }}>
                  {i18n.date(publishedDate, { year: "numeric", month: "long", day: "numeric" })}
                </Typography>
              )}
            </Flex>
            <Typography
              ref={titleRef}
              variant="body2"
              sx={{
                color: c.monochrome[800],
                px: s(7),
                typography: t.h1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                lineClamp: "2",
                WebkitBoxOrient: "vertical",
              }}
            >
              {title}
            </Typography>
            <Flex
              sx={{
                px: s(7),
                mt: s(4),
                minHeight: "42px",
                display: "flex",
                columnGap: s(4),
                rowGap: s(2),
                flexWrap: "wrap",
              }}
            >
              {[...markets, ...focusArticles].slice(0, 2).map(({ slug, title }) => (
                <MarketChip key={slug} slug={slug} label={title} />
              ))}
            </Flex>
            <Typography
              variant="body2"
              mt={2}
              sx={{
                mt: "auto",
                color: c.monochrome[800],
                px: s(7),
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "4",
                lineClamp: "4",
                WebkitBoxOrient: "vertical",
                [theme.breakpoints.only("xxxl")]: {
                  WebkitLineClamp: titleHeight > 48 ? "2" : "4",
                  lineClamp: titleHeight > 48 ? "2" : "4",
                },
                [theme.breakpoints.only("xxl")]: {
                  WebkitLineClamp: titleHeight > 48 ? "2" : "4",
                  lineClamp: titleHeight > 48 ? "2" : "4",
                },
                [theme.breakpoints.only("xl")]: {
                  WebkitLineClamp: titleHeight > 48 ? "2" : "4",
                  lineClamp: titleHeight > 48 ? "2" : "4",
                },
                [theme.breakpoints.only("lg")]: {
                  WebkitLineClamp: titleHeight > 48 ? "2" : "4",
                  lineClamp: titleHeight > 48 ? "2" : "4",
                },
                [theme.breakpoints.only("md")]: {
                  WebkitLineClamp: titleHeight > 36 ? "3" : "4",
                  lineClamp: titleHeight > 36 ? "3" : "4",
                },
                [theme.breakpoints.only("sm")]: {
                  WebkitLineClamp: titleHeight > 36 ? "4" : "5",
                  lineClamp: titleHeight > 36 ? "4" : "5",
                },
                [theme.breakpoints.only("xs")]: {
                  WebkitLineClamp: titleHeight > 36 ? "4" : "6",
                  lineClamp: titleHeight > 36 ? "4" : "6",
                },
                //TODO: check this one out once I have this breakpoint solved
                [theme.breakpoints.only("xxs")]: {
                  WebkitLineClamp: titleHeight > 36 ? "4" : "4",
                  lineClamp: titleHeight > 36 ? "4" : "4",
                },
              }}
            >
              {lead}
            </Typography>
          </Box>
        </Box>
      </NextLink>
    );
  }
};

export default BlogpostCard;
