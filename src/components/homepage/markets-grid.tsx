import { Box, Link } from "@mui/material";
import { default as NextLink } from "next/link";
import React from "react";

import { MarketCard } from "@/components/market-icon";
import { Market } from "@/domain/types";
import { useLocale } from "@/lib/use-locale";

export const MarketsGrid = ({ allMarkets }: { allMarkets: Market[] }) => {
  const locale = useLocale();

  return (
    <Box
      display="grid"
      component="ul"
      sx={{
        listStyle: "none",
        p: 0,
        pl: 0,
        gridGap: "0.75rem",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
      }}
    >
      {allMarkets.map((d) => {
        return (
          <Box
            component="li"
            key={d.slug}
            sx={{ mb: 4, listStyleType: "none" }}
          >
            <NextLink
              href="/market/[slug]"
              as={`/market/${d.slug}`}
              locale={locale}
              passHref
            >
              <Link sx={{ textDecoration: "none" }}>
                <MarketCard title={d.name} icon="bio" />
              </Link>
            </NextLink>
          </Box>
        );
      })}
    </Box>
  );
};
