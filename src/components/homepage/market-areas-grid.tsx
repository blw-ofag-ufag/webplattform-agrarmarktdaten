import { Box, Link } from "@mui/material";
import { default as NextLink } from "next/link";
import React from "react";

import { MarketCard } from "@/components/market-icon";
import { MarketArea } from "@/domain/types";
import { useLocale } from "@/lib/use-locale";

export const MarketAreasGrid = ({
  allMarketAreas,
}: {
  allMarketAreas: MarketArea[];
}) => {
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
      {allMarketAreas.map((area) => {
        return (
          <Box
            component="li"
            key={area.slug}
            sx={{ mb: 4, listStyleType: "none" }}
          >
            <NextLink
              href="/area/[slug]"
              as={`/area/${area.slug}`}
              locale={locale}
              passHref
            >
              <Link sx={{ textDecoration: "none" }}>
                <MarketCard title={area.title} icon={area.icon}></MarketCard>
              </Link>
            </NextLink>
          </Box>
        );
      })}
    </Box>
  );
};
