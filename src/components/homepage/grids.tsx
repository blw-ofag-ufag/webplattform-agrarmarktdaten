import { Box, Card, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { s } from "@interactivethings/swiss-federal-ci";
import { getMarketColor } from "@/domain/colors";
import { GridWrap, GridWrapElement } from "@/components/Grid";
import * as GQL from "@/graphql";
import { useLocale } from "@/lib/use-locale";
import { makeStyles } from "@/components/style-utils";

export type GridEntry = GQL.SimpleMarketArticleFragment | GQL.SimpleFocusArticleFragment;

interface Props {
  type: "market" | "focus";
  entries: GridEntry[];
}

export const CardsGrid = ({ type, entries }: Props) => {
  const locale = useLocale();

  return (
    <GridWrap sx={{ mb: s(10) }}>
      {entries.map((d) => (
        <GridWrapElement key={d.id}>
          <NextLink
            href={`/${type}/[slug]`}
            as={`/${type}/${d.slug}`}
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

const useStyles = makeStyles()(({ spacing: s, shadows: e }) => ({
  card: {
    width: "100%",
    boxShadow: e[4],
    borderRadius: s(2),
    "&:hover": { backgroundColor: `var(--bgColor)`, color: "var(--color)" },
  },
}));

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
      <Box sx={{ bgcolor: "var(--bgColor)", width: "100%", height: "20px", mb: s(5.5) }} />
      <Box sx={{ bgcolor: "var(--color)", width: "48px", height: "3px", ml: s(8) }} />
      <Typography data-debug-good variant="h2" component="h3" sx={{ mt: s(2), mx: s(8), mb: s(6) }}>
        {title}
      </Typography>
    </Card>
  );
};
