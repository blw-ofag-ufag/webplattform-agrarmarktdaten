import { Box, Card, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { s, b } from "@interactivethings/swiss-federal-ci";
import { getMarketColor } from "@/domain/colors";
import Grid from "@mui/material/Unstable_Grid2";

import * as GQL from "@/graphql";
import { useLocale } from "@/lib/use-locale";

const CARD_HEIGHT = 176;

interface Props {
  type: "market" | "focus";
  entries: GQL.SimpleMarketArticleFragment[] | GQL.SimpleFocusArticleFragment[];
}

export const CardsGrid = ({ type, entries }: Props) => {
  const locale = useLocale();

  return (
    <Box
      display="flex"
      sx={{
        flexWrap: "wrap",
        gap: 5,
        mb: s(10),
        justifyContent: "center",
        [b.up("xxxl")]: {
          mx: s(-16 / 2),
        },
        [b.up("xxl")]: {
          mx: s(-16 / 2),
        },
        [b.only("xl")]: {
          mx: s(-12 / 2),
        },
        [b.only("lg")]: {
          mx: s(-10 / 2),
        },
        [b.only("md")]: {
          mx: s(-9 / 2),
        },
        [b.only("sm")]: {
          mx: s(-7 / 2),
        },
        [b.only("xs")]: {
          mx: s(-5 / 2),
        },
        [b.down("xs")]: {
          mx: s(-4 / 2),
        },
        /* mx: "-32px" */
      }}
    >
      <Grid
        container
        columnSpacing={{
          xxs: "16px",
          xs: "20px",
          sm: "28px",
          md: "36px",
          lg: "40px",
          xl: "48px",
          xxl: "64px",
          xxxl: "64px",
        }}
        sx={{ maxWidth: "1900px", width: "100%" }}
        rowGap={6}
        columns={{ xxxl: 12, xxl: 12, xl: 12, lg: 6, md: 6, sm: 4, xs: 4, xxs: 4 }}
      >
        {entries.map((d) => {
          return (
            <Grid key={d.id} sx={{ mb: 4 }} xxxl={4} xxl={4} xl={4} lg={3} md={3} sm={4} xs={4} xxs={4}>
              <NextLink href={`/${type}/[slug]`} as={`/${type}/${d.slug}`} locale={locale} passHref legacyBehavior>
                <Link sx={{ textDecoration: "none" }}>
                  <GridCard type={type} title={d.title as string} slug={d.slug} />
                </Link>
              </NextLink>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

const GridCard = ({ title, type, slug }: { title: string; type: "market" | "focus"; slug?: string | null }) => {
  return type === "market" ? (
    <MarketCard title={title} slug={slug} />
  ) : type === "focus" ? (
    <ThemeCard title={title} />
  ) : null;
};

const MarketCard = ({ title, slug }: { title: string; slug?: string | null }) => {
  const [color, bgColor] = getMarketColor(slug);
  return (
    <Card
      elevation={4}
      sx={{
        width: "100%",
        height: CARD_HEIGHT,
        borderRadius: s(2),
        ":hover": { backgroundColor: bgColor, color },
      }}
    >
      <Box sx={{ bgcolor: bgColor, width: "100%", height: "20px", mb: s(5.5) }} />
      <Box sx={{ width: "48px", height: "3px", bgcolor: color, ml: s(8) }} />
      <Typography component="h2" sx={{ mt: s(2), ml: s(8), fontWeight: "bold", lineHeight: "heading" }}>
        {title}
      </Typography>
    </Card>
  );
};

const ThemeCard = ({ title }: { title: string }) => {
  return (
    <Card
      elevation={4}
      sx={{ width: "100%", height: CARD_HEIGHT, borderRadius: s(2), ":hover": { backgroundColor: "#ACB4BD" } }}
    >
      <Box sx={{ bgcolor: "#ACB4BD", width: "100%", height: "20px", mb: s(5.5) }} />
      <Box sx={{ width: "48px", height: "3px", bgcolor: "black", ml: s(8) }} />
      <Typography component="h2" sx={{ mt: s(2), ml: s(8), fontWeight: "bold", lineHeight: "heading" }}>
        {title}
      </Typography>
    </Card>
  );
};
