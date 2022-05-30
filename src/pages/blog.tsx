import { Chip, Stack } from "@mui/material";
import React from "react";

import { Hero } from "@/components/hero";
import { AppLayout } from "@/components/layout";
import { fetchCMS } from "@/lib/cms-api";

type BlogProps = {
  blogPage: {
    title: string;
    description: string;
  };
  allMarkets: {
    name: string;
  }[];
};

const BlogMarketFilters = ({ markets }: { markets: string[] }) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="center"
      sx={{ transform: "translateY(-50%)" }}
    >
      {markets.map((d) => (
        <Chip key={d} label={d} clickable />
      ))}
    </Stack>
  );
};

export default function Blog(props: BlogProps) {
  const {
    blogPage: { title, description },
    allMarkets,
  } = props;

  return (
    <AppLayout>
      <Hero title={title} description={description} />
      <BlogMarketFilters markets={allMarkets.map((d) => d.name)} />
    </AppLayout>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const query = `
    query BlogPageQuery($locale: SiteLocale!) {
      blogPage(locale: $locale) {
        title
        lead
      }

      allMarkets(locale: $locale) {
        name
      }
    }
  `;

  const result = await fetchCMS(query, {
    variables: { locale: context.locale },
    preview: context.preview,
  });

  return { props: result };
};
