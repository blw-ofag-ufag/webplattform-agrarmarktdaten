import React from "react";

import { BlogMarketFilters } from "@/components/blog/BlogMarketFilters";
import { Hero } from "@/components/hero";
import { AppLayout } from "@/components/layout";
import { Market } from "@/domain/types";
import { fetchCMS } from "@/lib/cms-api";

type Props = {
  blogPage: {
    title: string;
    lead: string;
  };
  allMarkets: Market[];
};

export default function Blog(props: Props) {
  const { blogPage, allMarkets } = props;

  return (
    <AppLayout>
      <Hero {...blogPage} />
      <BlogMarketFilters allMarkets={allMarkets} />
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
