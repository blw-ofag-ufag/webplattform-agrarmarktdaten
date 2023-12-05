import * as GQL from "@/graphql";
import { client } from "@/graphql/api";
import { AppLayout, LayoutSections } from "@/components/layout";
import { Hero } from "@/components/hero";
import { TopBlogpostsTeaser } from "@/components/TopBlogpostsTeaser";
import { StructuredText } from "@/components/StructuredText";
import { GridContainer } from "@/components/Grid";
import { TableOfContents } from "@/components/TableOfContents";
import { useLayoutStyles, useTableOfContentsSticky } from "@/components/useLayoutStyles";

export default function MethodsPage(props: GQL.MethodsPageQuery) {
  const { methodsPage, allMarketArticles, allFocusArticles, topBlogPosts } = props;
  const stickyRef = useTableOfContentsSticky();
  const { classes } = useLayoutStyles();
  if (!methodsPage?.title || !methodsPage.lead) {
    return null;
  }
  const alternates = methodsPage?._allSlugLocales?.map((loc) => ({
    href: "/methods",
    as: `/${loc.value}`,
    locale: loc.locale as string,
  }));
  return (
    <AppLayout
      alternates={alternates}
      allMarkets={allMarketArticles}
      allFocusArticles={allFocusArticles}
    >
      <Hero title={methodsPage.title} lead={methodsPage.lead} bgColor="#DFE4E9" shiftedLeft />
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
      <LayoutSections>
        <TopBlogpostsTeaser blogposts={topBlogPosts} />
      </LayoutSections>
    </AppLayout>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.MethodsPageQuery>(
      GQL.MethodsPageDocument,
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
