import React from "react";

import { Banner } from "@/components/banner";
import { AppLayout } from "@/components/layout";
import * as GQL from "@/graphql";
import { client } from "@/graphql";

export default function About({
  aboutPage,
  allMarkets,
}: {
  aboutPage: { title: string; description: string };
  allMarkets: GQL.MarketRecord[];
}) {
  return (
    <AppLayout allMarkets={allMarkets}>
      <Banner title={aboutPage.title} intro={aboutPage.description} />
    </AppLayout>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.AboutPageQuery>(GQL.AboutPageDocument, {
      locale: context.locale,
    })
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return { props: result.data };
};
