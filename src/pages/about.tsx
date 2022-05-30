import React from "react";

import { Banner } from "@/components/banner";
import { AppLayout } from "@/components/layout";
import { Market } from "@/domain/types";
import { fetchCMS } from "@/lib/cms-api";

export default function About({
  aboutPage,
  allMarkets,
}: {
  aboutPage: { title: string; description: string };
  allMarkets: Market[];
}) {
  return (
    <AppLayout allMarkets={allMarkets}>
      <Banner title={aboutPage.title} intro={aboutPage.description} />
    </AppLayout>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const query = `
    query PageQuery($locale: SiteLocale!){
      aboutPage(locale: $locale) {
        title
        lead
      }

      allMarkets(locale: $locale) {
        name
        icon {
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
