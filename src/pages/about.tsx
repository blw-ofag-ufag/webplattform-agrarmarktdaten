import React from "react";

import { Banner } from "@/components/banner";
import { AppLayout } from "@/components/layout";
import { Market } from "@/domain/types";
import * as GQL from "@/graphql";
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
        title
        tile {
          url
        }
        slug
      }
    }
  `;

  const result = await fetchCMS<GQL.AboutPageQuery>(GQL.AboutPageDocument, {
    variables: { locale: context.locale },
    preview: context.preview,
  });

  return { props: result };
};
