import * as GQL from "@/graphql";
import { client } from "@/graphql/api";
import { GetStaticPaths } from "next";
import { AppLayout } from "@/components/layout";
import { Hero } from "@/components/hero";
import { StructuredText } from "@/components/StructuredText";
import { GridContainer } from "@/components/Grid";
import { TableOfContents } from "@/components/TableOfContents";
import { useLayoutStyles, useTableOfContentsSticky } from "@/components/useLayoutStyles";
import Head from "next/head";
import { renderMetaTags } from "react-datocms";
import { isValidLocale } from "@/locales/locales";

export default function MethodsPage(props: GQL.MethodsPageQuery) {
  const {
    methodsPage,
    method,
    allMarketArticles,
    allFocusArticles,
    allMethodsPages,
    glossaryPage,
    site,
  } = props;
  const stickyRef = useTableOfContentsSticky();
  const { classes } = useLayoutStyles();
  if (!methodsPage?.title || !methodsPage.lead) {
    return null;
  }

  const alternates = methodsPage?._allSlugLocales?.map((loc) => {
    const methodLocale = method?._allSlugLocales?.find((l) => l.locale === loc.locale);
    return {
      href: "/methods/[slug]",
      as: `/${methodLocale?.value}/${loc.value}`,
      locale: loc.locale as string,
    };
  });

  return (
    <>
      <Head>{renderMetaTags([...methodsPage.seo, ...site?.favicon])}</Head>
      <AppLayout
        alternates={alternates}
        allMarkets={allMarketArticles}
        allFocusArticles={allFocusArticles}
        allMethodsPages={allMethodsPages}
        glossaryPage={glossaryPage}
        showBackButton
      >
        <Hero title={methodsPage.title} lead={methodsPage.lead} shiftedLeft />
        <GridContainer sx={{ mt: 4, position: "relative" }}>
          <div ref={stickyRef} className={classes.aside}>
            {methodsPage.content && (
              <TableOfContents
                data={methodsPage.content}
                sx={{ height: "fit-content", width: "100%" }}
              />
            )}
          </div>
          <div className={classes.content}>
            {methodsPage.content && <StructuredText data={methodsPage.content} />}
          </div>
        </GridContainer>
      </AppLayout>
    </>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.MethodsPageQuery>(
      GQL.MethodsPageDocument,
      { locale: context.locale, slug: context.params.slug },
      { requestPolicy: "network-only" }
    )
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return { props: result.data, revalidate: 10 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await client
    .query<GQL.AllMethodsPagesSlugLocalesQuery>(GQL.AllMethodsPagesSlugLocalesDocument, {})
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  const paths = result.data.allMethodsPages.flatMap((page) => {
    return page._allSlugLocales
      ? page._allSlugLocales
          .filter((x) => isValidLocale(x.locale))
          ?.map((loc) => ({
            locale: loc.locale ?? undefined,
            params: { slug: loc.value ?? undefined },
          }))
      : [];
  });

  return { fallback: false, paths };
};
