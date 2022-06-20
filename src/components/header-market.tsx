import { Box, Card, Link, Typography } from "@mui/material";
import { default as NextLink } from "next/link";
import React from "react";

import Flex from "@/components/flex";
import * as GQL from "@/graphql";
import { useLocale } from "@/lib/use-locale";

export const MarketHeader = ({
  toggleMarketMenu,
  allMarkets,
}: {
  toggleMarketMenu: (x: boolean) => void;
  allMarkets: GQL.MarketRecord[];
}) => {
  const locale = useLocale();

  return (
    <Flex
      component="ul"
      sx={{
        flexDirection: ["column", "column", "row"],
        listStyle: "none",
        my: [0, 0, 6],
        px: [4, 4, "40px"],
        py: [5, 5, 0],
        justifyContent: ["flex-start", "flex-start", "space-between"],
        alignItems: ["center", "center", "flex-start"],
        flex: "1 1 0px",
        flexFlow: ["none", "none", "row wrap"],
        zIndex: 30,
      }}
    >
      {allMarkets.map((d) => {
        return (
          <Box
            component="li"
            key={d.slug}
            sx={{ width: ["100%", "100%", "auto"] }}
          >
            <NextLink
              href="/market/[slug]"
              as={`/market/${d.slug}`}
              locale={locale}
              passHref
            >
              <Link
                sx={{ textDecoration: "none" }}
                onClick={() => toggleMarketMenu(false)}
              >
                <MarketCard title={d.title as string} />
              </Link>
            </NextLink>
          </Box>
        );
      })}
    </Flex>
  );
};

const MarketCard = ({ title }: { title: string }) => {
  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        width: ["100%", "100%", 150],
        flexDirection: ["row", "row", "column"],
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Typography
        component="h2"
        sx={{
          fontSize: 5,
          fontWeight: "bold",
          lineHeight: "heading",
          textAlign: "center",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        {title}
      </Typography>
    </Card>
  );
};
