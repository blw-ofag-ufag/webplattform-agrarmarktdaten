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
      display="flex"
      sx={{
        flexWrap: "wrap",
        gap: 5,
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
                <MarketCard title={d.name} />
              </Link>
            </NextLink>
          </Box>
        );
      })}
    </Box>
  );
};
