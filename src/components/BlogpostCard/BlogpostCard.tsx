import * as React from "react";
import { Typography } from "@mui/material";
import NextLink from "next/link";
import { i18n } from "@lingui/core";
import * as GQL from "@/graphql";
import { useLocale } from "@/lib/use-locale";
import { Image } from "react-datocms";
import { MarketChip } from "@/components/MarketChip";

import { makeStyles } from "@/components/style-utils";
import { useLineClamping, isHTMLElement } from "../../utils/clamp";

const useStyles = makeStyles<void, "full" | "third" | "card">()((
  { spacing: s, shadows: e, palette: c, breakpoints: b },
  _params,
  classes
) => {
  return {
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
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      width: "100%",
      minWidth: "100%",
      height: "556px",

      [`${b.up("xl")}`]: {
        height: 556,
      },
      [`${b.between("sm", "xl")}`]: {
        height: 418,
      },
      [`${b.down("sm")}`]: {
        height: 556,
      },
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
      [`.${classes.card}:hover &`]: {
        textDecoration: "underline",
      },
      [`.${classes.full} &`]: {
        overflow: "hidden",
        textOverflow: "ellipsis",
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

        // Prevent title to completely disappear due to
        // gridTemplateRow auto
        minHeight: "1.5em",
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
      position: "relative",
      overflow: "hidden",

      [`.${classes.full} &`]: {
        maxHeight: "556px",
        minHeight: "100%",
        minWidth: "100%",
      },
      [`.${classes.third} &`]: {
        minWidth: "100%",
        aspectRatio: 16 / 9,
        maxHeight: "280px",
        height: "100%",
      },
    },

    content: {
      [`.${classes.full} &`]: {
        display: "grid",
        gridTemplateRows: "min-content min-content min-content auto",
        padding: s(5, 7),
        flexGrow: 0,
        flexShrink: 0,
        overflow: "hidden",
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
  };
});

const clampedClassName = "clamped";

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
  const cardRef = React.useRef<HTMLDivElement>(null);
  useLineClamping(() => {
    return cardRef.current
      ? Array.from(cardRef.current.querySelectorAll(`.${clampedClassName}`)).filter(isHTMLElement)
      : [];
  });

  const { classes, cx } = useStyles();

  if (variant === "half") {
    return null;
  }

  return (
    <NextLink href="/blog/[slug]" as={`/blog/${slug}`} locale={locale} passHref legacyBehavior>
      <div
        className={cx(classes.card, variant === "third" ? classes.third : classes.full)}
        ref={cardRef}
      >
        <div className={classes.image}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          {image?.responsiveImage && <Image data={image?.responsiveImage} layout="fill" />}
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
            variant={variant === "full" ? "h1" : "h2"}
            component="h2"
            className={cx(classes.title, clampedClassName)}
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
            className={cx(classes.lead, clampedClassName)}
          >
            {leadCard}
          </Typography>
        </div>
      </div>
    </NextLink>
  );
};

export default BlogpostCard;
