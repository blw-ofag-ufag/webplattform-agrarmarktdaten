import { default as NextLink } from "next/link";
import React from "react";
import { Box, Grid, Link } from "theme-ui";
import { MarketArea } from "../../domain/types";
import { useLocale } from "../../lib/use-locale";
import { MarketCard } from "../market-icon";

export const MarketAreasGrid = ({
  allMarketAreas,
}: {
  allMarketAreas: MarketArea[];
}) => {
  const locale = useLocale();

  return (
    <Grid as="ul" sx={{ listStyle: "none", p: 0 }} width={[150, null, 150]}>
      {allMarketAreas.map((area) => {
        return (
          <Box as="li" key={area.slug} sx={{ mb: 8 }}>
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
    </Grid>
  );
};
