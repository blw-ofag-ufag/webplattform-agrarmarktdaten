import { default as NextLink } from "next/link";
import React from "react";
import { Box, Grid, Link } from "theme-ui";
import { MarketCard } from "../market-icon";
import { MarketArea } from "../../domain/types";
import { useLocale } from "@interactivethings/visualize-app";

export const MarketAreasGrid = ({
  allMarketAreas
}: {
  allMarketAreas: MarketArea[];
}) => {
  const locale = useLocale();

  return (
    <Grid
      as="ul"
      sx={{ listStyle: "none", m: 0, p: 0 }}
      width={[150, null, 150]}
    >
      {allMarketAreas.map(area => {
        return (
          <Box as="li" key={area.slug} sx={{ mb: 8 }}>
            <NextLink
              href="/[locale]/area/[slug]"
              as={`/${locale}/area/${area.slug}`}
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
