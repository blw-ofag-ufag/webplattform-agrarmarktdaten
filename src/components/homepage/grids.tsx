import { Box, Card, Link, Typography } from "@mui/material";
import { default as NextLink } from "next/link";
import React from "react";

import { useLocale } from "@/lib/use-locale";

type Entry = {
  title: string;
  slug: string;
};

export const CardsGrid = ({
  type,
  entries,
}: {
  type: "market" | "theme";
  entries: Entry[];
}) => {
  const locale = useLocale();

  return (
    <Box
      display="flex"
      sx={{
        flexWrap: "wrap",
        gap: 5,
      }}
    >
      {entries.map((d) => {
        return (
          <Box
            component="li"
            key={d.slug}
            sx={{ mb: 4, listStyleType: "none" }}
          >
            <NextLink
              href={`/${type}/[slug]`}
              as={`/${type}/${d.slug}`}
              locale={locale}
              passHref
            >
              <Link sx={{ textDecoration: "none" }}>
                <GridCard type={type} title={d.title} />
              </Link>
            </NextLink>
          </Box>
        );
      })}
    </Box>
  );
};

const CARD_WIDTH = 226;
const CARD_HEIGHT = 280;

const GridCard = ({
  title,
  type,
}: {
  title: string;
  type: "market" | "theme";
}) => {
  return type === "market" ? (
    <MarketCard title={title} />
  ) : type === "theme" ? (
    <ThemeCard title={title} />
  ) : null;
};

const MarketCard = ({ title }: { title: string }) => {
  return (
    <Card
      elevation={0}
      sx={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderTopRightRadius: "30px",
        borderBottomLeftRadius: "30px",
        backgroundColor: "grey.300",
      }}
    >
      <Typography
        component="h2"
        sx={{
          mt: "30px",
          ml: "20px",
          fontSize: 5,
          fontWeight: "bold",
          lineHeight: "heading",
          textTransform: "uppercase",
        }}
      >
        {title}
      </Typography>
    </Card>
  );
};

const ThemeCard = ({ title }: { title: string }) => {
  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: "30px",
        backgroundColor: "grey.300",
      }}
    >
      <Typography
        component="h2"
        sx={{
          fontSize: 5,
          fontWeight: "bold",
          lineHeight: "heading",
          textTransform: "uppercase",
        }}
      >
        {title}
      </Typography>
    </Card>
  );
};
