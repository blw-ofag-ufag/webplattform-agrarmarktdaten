import { Box } from "@mui/material";
import "isomorphic-unfetch";
import dynamic from "next/dynamic";
import React from "react";

import { Banner } from "@/components/banner";
import { AppLayout } from "@/components/layout";
import { Market } from "@/domain/types";
import { fetchCMS } from "@/lib/cms-api";

// Dynamic import to escape SSR:
// The "window" object needs to be available to embed powerBI report
const DynamicReport = dynamic(() => import("../components/powerbi-report"), {
  ssr: false,
});

export default function Report({ allMarkets }: { allMarkets: Market[] }) {
  return (
    <AppLayout allMarkets={allMarkets}>
      <Banner
        title={"Früchte und Gemüse 2006-2019"}
        intro={"Auswertung Durchschnittspreis Früchte und Gemüse 2006-2019"}
      />
      <Box
        sx={{
          mx: "auto",
          maxWidth: "96rem",
          px: [4, 4, 6],
          py: 6,
          iframe: {
            border: 0,
          },
        }}
      >
        <DynamicReport />
      </Box>
    </AppLayout>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const query = `
  query PageQuery($locale: SiteLocale!){
    allMarkets(locale: $locale) {
      name
      tile {
        url
      }
      slug
    }
  }
  `;

  const result = await fetchCMS(query, {
    variables: { locale: context.locale },
    preview: context.preview,
  });

  return { props: result };
};
