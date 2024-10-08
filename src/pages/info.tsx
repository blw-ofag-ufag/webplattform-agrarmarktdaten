import * as GQL from "@/graphql";
import { client } from "@/graphql/api";
import { AppLayout } from "@/components/layout";
import { Hero } from "@/components/hero";
import { StructuredText } from "@/components/StructuredText";
import { GridContainer } from "@/components/Grid";
import { TableOfContents } from "@/components/TableOfContents";
import { useLayoutStyles, useTableOfContentsSticky } from "@/components/useLayoutStyles";
import Head from "next/head";
import { renderMetaTags } from "react-datocms";

export default function InfoPage(props: GQL.InfoPageQuery) {
  const { infoPage, allMarketArticles, allFocusArticles, allMethodsPages, glossaryPage, site } =
    props;
  const stickyRef = useTableOfContentsSticky();
  const { classes } = useLayoutStyles();
  if (!infoPage?.title || !infoPage.lead) {
    return null;
  }
  const alternates = infoPage?._allSlugLocales?.map((loc) => ({
    href: "/info",
    as: `/${loc.value}`,
    locale: loc.locale as string,
  }));
  return (
    <>
      <Head>{renderMetaTags([...infoPage.seo, ...site?.favicon])}</Head>
      <AppLayout
        alternates={alternates}
        allMarkets={allMarketArticles}
        allFocusArticles={allFocusArticles}
        allMethodsPages={allMethodsPages}
        glossaryPage={glossaryPage}
        showBackButton
      >
        <Hero title={infoPage.title} lead={infoPage.lead} shiftedLeft />
        <GridContainer sx={{ mt: 4, position: "relative" }}>
          <div ref={stickyRef} className={classes.aside}>
            {infoPage.content && (
              <TableOfContents
                data={infoPage.content}
                sx={{ height: "fit-content", width: "100%" }}
              />
            )}
          </div>
          <div className={classes.content}>
            {infoPage.content && <StructuredText data={infoPage.content} />}
          </div>
        </GridContainer>
      </AppLayout>
    </>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.InfoPageQuery>(
      GQL.InfoPageDocument,
      { locale: context.locale },
      { requestPolicy: "network-only" }
    )
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return { props: result.data, revalidate: 10 };
};
