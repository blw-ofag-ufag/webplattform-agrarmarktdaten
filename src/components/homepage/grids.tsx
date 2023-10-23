import { Box, Card, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { s } from "@interactivethings/swiss-federal-ci";
import { getMarketColor } from "@/domain/colors";
import { GridWrap, GridWrapElement } from "@/components/Grid";
import { useTheme } from "@mui/material/styles";
import * as GQL from "@/graphql";
import { useLocale } from "@/lib/use-locale";

interface Props {
  type: "market" | "focus";
  entries: GQL.SimpleMarketArticleFragment[] | GQL.SimpleFocusArticleFragment[];
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

const GridCard = ({
  title,
  type,
  slug,
}: {
  title: string;
  type: "market" | "focus";
  slug?: string | null;
}) => {
  return type === "market" ? (
    <MarketCard title={title} slug={slug} />
  ) : type === "focus" ? (
    <ThemeCard title={title} />
  ) : null;
};

const MarketCard = ({ title, slug }: { title: string; slug?: string | null }) => {
  const [color, bgColor] = getMarketColor(slug);
  const theme = useTheme();
  return (
    <Card
      elevation={4}
      sx={{
        width: "100%",
        [theme.breakpoints.up("xxl")]: { height: "176px", pb: s(18) },
        [theme.breakpoints.down("xxl")]: { height: "120px", pb: s(18) },
        borderRadius: s(2),
        ":hover": { backgroundColor: bgColor, color },
      }}
    >
      <Box sx={{ bgcolor: bgColor, width: "100%", height: "20px", mb: s(5.5) }} />
      <Box sx={{ width: "48px", height: "3px", bgcolor: color, ml: s(8) }} />
      <Typography
        component="h2"
        sx={{ mt: s(2), mx: s(8), fontWeight: "bold", lineHeight: "heading" }}
      >
        {title}
      </Typography>
    </Card>
  );
};

const ThemeCard = ({ title }: { title: string }) => {
  const theme = useTheme();
  return (
    <Card
      elevation={4}
      sx={{
        width: "100%",
        [theme.breakpoints.up("xxl")]: { height: "176px", pb: s(18) },
        [theme.breakpoints.down("xxl")]: { height: "120px", pb: s(18) },
        borderRadius: s(2),
        ":hover": { backgroundColor: "#ACB4BD" },
      }}
    >
      <Box sx={{ bgcolor: "#ACB4BD", width: "100%", height: "20px", mb: s(5.5) }} />
      <Box sx={{ width: "48px", height: "3px", bgcolor: "black", ml: s(8) }} />
      <Typography
        component="h2"
        sx={{ mt: s(2), ml: s(8), fontWeight: "bold", lineHeight: "heading" }}
      >
        {title}
      </Typography>
    </Card>
  );
};
