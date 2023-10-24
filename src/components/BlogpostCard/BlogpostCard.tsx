import * as React from "react";
import { Box, Typography } from "@mui/material";
import NextLink from "next/link";
import { i18n } from "@lingui/core";
import * as GQL from "@/graphql";
import { useLocale } from "@/lib/use-locale";
import { Image } from "react-datocms";
import { MarketChip } from "@/components/MarketChip";
import { useTheme } from "@mui/material/styles";

import Flex from "../flex";
import { lineClamp } from "../../utils/lineClamp";
import { makeStyles } from "@/components/style-utils";

const useStyles = makeStyles()(({ spacing: s, shadows: e }) => ({
  containerFull: {
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
  },

  publishedDateFull: {
    paddingRight: s(20),
    paddingLeft: s(16),
    paddingTop: s(10),
    width: "100%",
    overflowY: "hidden",
    height: "100%",
  },

  titleFull: {
    lineHeight: "48px",
    marginTop: s(4),
    fontWeight: 700,
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "3",
    lineClamp: "3",
    WebkitBoxOrient: "vertical",
  },

  marketChipsFull: {
    marginTop: s(4),
    display: "flex",
    columnGap: s(4),
    rowGap: s(2),
    flexWrap: "wrap",
  },

  leadFull: {
    fontSize: "18px",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "7",
    lineClamp: "7",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },

  containerThird: {
    maxWidth: "100%",
    boxShadow: e[6],
    borderRadius: s(2),
    cursor: "pointer",
  },

  imageThird: {
    position: "relative",
    overflow: "hidden",
    minWidth: "100%",
    aspectRatio: 16 / 9,
    borderTopLeftRadius: s(2),
    borderTopRightRadius: s(2),
  },

  contentThird: {
    paddingBottom: s(9),
    paddingTop: s(9),
    display: "flex",
    flexDirection: "column",
    minHeight: "302px",
    maxHeight: "302px",
    height: "100%",
  },

  publishedDateThird: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: s(7),
    paddingRight: s(7),

    marginBottom: s(4),
  },

  titleThird: {
    paddingLeft: s(7),
    paddingRight: s(7),
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    lineClamp: "2",
    WebkitBoxOrient: "vertical",
  },

  marketChipsThird: {
    paddingLeft: s(7),
    paddingRight: s(7),
    marginTop: s(4),
    minHeight: "42px",
    display: "flex",
    columnGap: s(4),
    rowGap: s(2),
    flexWrap: "wrap",
  },

  leadThird: {
    marginTop: "auto",
    paddingLeft: s(7),
    paddingRight: s(7),
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    ...lineClamp("4"),
    WebkitBoxOrient: "vertical",
  },
}));

export const BlogpostCard = (
  props: GQL.SimpleBlogPostFragment & { variant?: "full" | "half" | "third" }
) => {
  const {
    title,
    leadCard,
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

  const { classes } = useStyles();

  if (variant === "half") {
    return null;
  }

  if (variant === "full") {
    return (
      <NextLink href="/blog/[slug]" as={`/blog/${slug}`} locale={locale} passHref legacyBehavior>
        <Box className={classes.containerFull}>
          {image?.responsiveImage && (
            <Box sx={{ maxHeight: "556px", minWidth: "66.66%" }}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image
                data={image?.responsiveImage}
                layout="responsive"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          )}
          <Box className={classes.publishedDateFull}>
            {publishedDate && (
              <Typography variant="body2" color="textSecondary">
                {i18n.date(publishedDate, { year: "numeric", month: "long", day: "numeric" })}
              </Typography>
            )}
            <Typography
              ref={titleRef}
              variant="h1"
              component="div"
              color="textPrimary"
              className={classes.titleFull}
            >
              {title}
            </Typography>
            <Box className={classes.marketChipsFull}>
              {[...markets, ...focusArticles].slice(0, 2).map(({ slug, title }) => (
                <MarketChip key={slug} slug={slug} label={title} />
              ))}
            </Box>

            <Box sx={{ pt: 4 }}>
              <Typography variant="body1" color="textPrimary" className={classes.leadFull}>
                {leadCard}
              </Typography>
            </Box>
          </Box>
        </Box>
      </NextLink>
    );
  }

  if (variant === "third") {
    return (
      <NextLink href="/blog/[slug]" as={`/blog/${slug}`} locale={locale} passHref legacyBehavior>
        <Box className={classes.containerThird}>
          <Box className={classes.imageThird}>
            {image?.responsiveImage && (
              <Box sx={{ maxHeight: "280px", height: "100%" }}>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image data={image?.responsiveImage} layout="responsive" />
              </Box>
            )}
          </Box>

          <Box className={classes.contentThird}>
            <Flex className={classes.publishedDateThird}>
              {publishedDate && (
                <Typography variant="body2" color="textSecondary" sx={{ mt: 0 }}>
                  {i18n.date(publishedDate, { year: "numeric", month: "long", day: "numeric" })}
                </Typography>
              )}
            </Flex>
            <Typography
              ref={titleRef}
              variant="h1"
              component="div"
              color="textPrimary"
              className={classes.titleThird}
            >
              {title}
            </Typography>
            <Flex className={classes.marketChipsThird}>
              {[...markets, ...focusArticles].slice(0, 2).map(({ slug, title }) => (
                <MarketChip key={slug} slug={slug} label={title} />
              ))}
            </Flex>
            <Typography
              variant="body2"
              mt={2}
              className={classes.leadThird}
              color="textPrimary"
              sx={{
                [theme.breakpoints.up("lg")]: lineClamp(titleHeight > 48 ? "2" : "4"),

                [theme.breakpoints.up("md")]: lineClamp(titleHeight > 36 ? "3" : "4"),
                [theme.breakpoints.only("sm")]: lineClamp(titleHeight > 36 ? "4" : "5"),
                [theme.breakpoints.only("xs")]: lineClamp(titleHeight > 36 ? "4" : "6"),
                //TODO: check this one out once I have this breakpoint solved
                [theme.breakpoints.only("xxs")]: lineClamp(titleHeight > 36 ? "4" : "4"),
              }}
            >
              {leadCard}
            </Typography>
          </Box>
        </Box>
      </NextLink>
    );
  }
};

export default BlogpostCard;
