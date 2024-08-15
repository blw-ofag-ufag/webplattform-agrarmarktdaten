import { Box, Card, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { s } from "@interactivethings/swiss-federal-ci";
import { getMarketColor } from "@/domain/colors";
import { GridWrap, GridWrapElement } from "@/components/Grid";
import * as GQL from "@/graphql";
import { makeStyles } from "@/components/style-utils";
import { useRouter } from "next/router";
import slugs from "@/generated/slugs.json";

export type GridEntry = GQL.SimpleMarketArticleFragment | GQL.SimpleFocusArticleFragment;

interface Props {
  type: "market" | "focus";
  entries: GridEntry[];
}

export const CardsGrid = ({ type, entries }: Props) => {
  const { locale } = useRouter();
  const localeSlugs = slugs.find((slug) => slug.locale === locale)?.slugs;
  const typeLocale =
    type === "market" ? localeSlugs?.market : type === "focus" ? localeSlugs?.focus : null;
  return (
    <GridWrap>
      {entries.map((d) => (
        <GridWrapElement key={d.id}>
          <NextLink
            href={`/${type}/[slug]`}
            as={`/${typeLocale}/${d.slug}`}
            locale={locale}
            passHref
            legacyBehavior
          >
            <Link sx={{ textDecoration: "none" }}>
              <GridCard type={type} title={d.title as string} slug={d.slug} />
            </Link>
          </NextLink>
        </GridWrapElement>
      ))}
    </GridWrap>
  );
};

const getCardColors = (type: "market" | "focus", slug?: string | null) => {
  switch (type) {
    case "market":
      return getMarketColor(slug);
    case "focus":
      return ["black", "#ACB4BD"];
  }
};

const useStyles = makeStyles<void, "card">()(
  ({ spacing: s, shadows: e, breakpoints: b }, _params, classes) => ({
    card: {
      width: "100%",
      height: "100%",
      boxShadow: e.lg,
      borderRadius: s(2),
      "--dashColor": "black",
      overflow: "hidden",
      position: "relative",
      "&:hover": {
        boxShadow: e.xxl,
        // backgroundColor: `var(--bgColor)`,
        color: "var(--color)",
        "--dashColor": "var(--color)",
      },

      [b.up("xxl")]: { minHeight: "176px" },
      [b.down("xxl")]: { minHeight: "135px" },

      // For the colored border to be properly cut of by the border radius
      isolation: "isolate",
    },

    borderTop: {
      backgroundColor: "var(--bgColor)",
      width: "100%",
      height: "20px",
      marginBottom: s(5),
      transition: "transform 0.3s ease-out",
      transform: "scaleY(1)",
      willChange: "transform",
      transformOrigin: "top center",
      zIndex: -1,

      [`.${classes.card}:hover &`]: {
        transform: "scaleY(10)",
      },
    },

    text: {
      zIndex: 1,
      position: "relative",
      transition: "color 0.3s ease",
    },

    dash: {
      position: "relative",
      zIndex: 1,
      backgroundColor: "var(--dashColor)",
      transition: "background-color 0.3s ease",
      width: "48px",
      height: "3px",
      marginLeft: s(6),
    },
  })
);

const GridCard = ({
  title,
  type,
  slug,
}: {
  title: string;
  type: "market" | "focus";
  slug?: string | null;
}) => {
  const { classes } = useStyles();
  const [color, bgColor] = getCardColors(type, slug);
  const style = { "--bgColor": bgColor, "--color": color } as React.CSSProperties;
  return (
    <Card className={classes.card} style={style}>
      <Box className={classes.borderTop} />
      <Box className={classes.dash} />
      <Typography
        className={classes.text}
        variant="h2"
        component="h3"
        sx={{ mt: s(2), mx: s(8), mb: s(6) }}
      >
        {title}
      </Typography>
    </Card>
  );
};
