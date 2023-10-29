import * as React from "react";
import { Typography } from "@mui/material";
import NextLink from "next/link";
import { i18n } from "@lingui/core";
import * as GQL from "@/graphql";
import { useLocale } from "@/lib/use-locale";
import { Image } from "react-datocms";
import { MarketChip } from "@/components/MarketChip";
import { useTheme } from "@mui/material/styles";

import { lineClamp } from "../../utils/lineClamp";
import { makeStyles } from "@/components/style-utils";

const useStyles = makeStyles<void, "full" | "third">()(
  ({ spacing: s, shadows: e, palette: c }, _params, classes) => ({
    card: {
      overflow: "hidden",
      boxShadow: e[6],
      backgroundColor: c.background.paper,
      borderRadius: s(2),
      cursor: "pointer",
      transition: "box-shadow 0.5s ease",
      "&:hover": {
        boxShadow: e[12],
      },
    },
    full: {
      display: "flex",
      width: "100%",
      minWidth: "100%",
      height: "556px",
    },

    third: {
      maxWidth: "100%",
      "--px": s(6),
    },

    publishedDate: {
      [`.${classes.full} &`]: {
        paddingRight: s(20),
        paddingLeft: s(16),
        paddingTop: s(2),
        marginBottom: s(4),
        width: "100%",
        overflowY: "hidden",
      },
      [`.${classes.third} &`]: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: "var(--px)",
        paddingRight: "var(--px)",

        marginBottom: s(4),
      },
    },

    title: {
      [`.${classes.full} &`]: {
        lineHeight: "48px",
        fontWeight: 700,
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: "3",
        lineClamp: "3",
        WebkitBoxOrient: "vertical",
      },

      [`.${classes.third} &`]: {
        paddingLeft: "var(--px)",
        paddingRight: "var(--px)",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: "2",
        lineClamp: "2",
        WebkitBoxOrient: "vertical",
      },
    },

    marketChips: {
      [`.${classes.full} &`]: {
        marginTop: s(4),
        display: "flex",
        columnGap: s(4),
        rowGap: s(2),
        flexWrap: "wrap",
        marginBottom: s(4),
      },
      [`.${classes.third} &`]: {
        paddingLeft: "var(--px)",
        paddingRight: "var(--px)",
        marginTop: s(4),
        marginBottom: s(2),
        minHeight: "42px",
        display: "flex",
        columnGap: s(4),
        rowGap: s(2),
        flexWrap: "wrap",
      },
    },

    lead: {
      [`.${classes.full} &`]: {
        fontSize: "18px",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: "7",
        lineClamp: "7",
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      },
      [`.${classes.third} &`]: {
        paddingLeft: "var(--px)",
        paddingRight: "var(--px)",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
      },
    },

    image: {
      [`.${classes.full} &`]: {
        position: "relative",
        overflow: "hidden",
        aspectRatio: 16 / 9,
        maxHeight: "556px",
        minWidth: "66.66%",
        height: "100%",
      },
      [`.${classes.third} &`]: {
        position: "relative",
        overflow: "hidden",
        minWidth: "100%",
        aspectRatio: 16 / 9,
        maxHeight: "280px",
        height: "100%",
      },
    },

    content: {
      [`.${classes.full} &`]: {
        display: "flex",
        flexDirection: "column",
        padding: s(5, 7),
        flexShrink: 0,
      },
      [`.${classes.third} &`]: {
        paddingBottom: s(5),
        paddingTop: s(5),
        display: "flex",
        flexDirection: "column",
        minHeight: "302px",
        maxHeight: "302px",
        height: "100%",
      },
    },
  })
);

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

  const { classes, cx } = useStyles();

  if (variant === "half") {
    return null;
  }

  return (
    <NextLink href="/blog/[slug]" as={`/blog/${slug}`} locale={locale} passHref legacyBehavior>
      <div className={cx(classes.card, variant === "third" ? classes.third : classes.full)}>
        <div className={classes.image}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          {image?.responsiveImage && <Image data={image?.responsiveImage} layout="responsive" />}
        </div>

        <div className={classes.content}>
          <div className={classes.publishedDate}>
            <Typography variant="body3" data-debug-good color="textSecondary">
              {publishedDate ? (
                i18n.date(publishedDate, { year: "numeric", month: "long", day: "numeric" })
              ) : (
                <>&nbsp;</>
              )}
            </Typography>
          </div>
          <Typography
            ref={titleRef}
            variant={variant === "full" ? "h1" : "h2"}
            component="h2"
            className={classes.title}
            data-debug-good
          >
            {title}
          </Typography>
          <div className={classes.marketChips}>
            {[...markets, ...focusArticles].slice(0, 2).map(({ slug, title }) => (
              <MarketChip key={slug} slug={slug} label={title} />
            ))}
          </div>
          <Typography
            variant="body1"
            data-debug-good
            className={classes.lead}
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
        </div>
      </div>
    </NextLink>
  );
};

export default BlogpostCard;
