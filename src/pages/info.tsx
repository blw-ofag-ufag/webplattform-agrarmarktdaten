import * as GQL from "@/graphql";
import { client } from "@/graphql/api";
import { AppLayout, LayoutSections } from "@/components/layout";
import { Hero } from "@/components/hero";
import { TopBlogpostsTeaser } from "@/components/TopBlogpostsTeaser";
import { StructuredText } from "@/components/StructuredText";
import { GridContainer } from "@/components/Grid";
import { TableOfContents } from "@/components/TableOfContents";
import { useLayoutStyles, useTableOfContentsSticky } from "@/components/useLayoutStyles";

export default function InfoPage(props: GQL.InfoPageQuery) {
  const { infoPage, allMarketArticles, allFocusArticles, topBlogPosts } = props;
  const stickyRef = useTableOfContentsSticky();
  const { classes } = useLayoutStyles();
  if (!infoPage?.title || !infoPage.lead) {
    return null;
  }
  return (
    <AppLayout allMarkets={allMarketArticles} allFocusArticles={allFocusArticles}>
      <Hero title={infoPage.title} lead={infoPage.lead} bgColor="#DFE4E9" shiftedLeft />
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
      <LayoutSections>
        <TopBlogpostsTeaser blogposts={topBlogPosts} />
      </LayoutSections>
    </AppLayout>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.InfoPageQuery>(
      GQL.InfoPageDocument,
      {
        locale: context.locale,
      },
      { requestPolicy: "network-only" }
    )
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return { props: result.data, revalidate: 10 };
};
