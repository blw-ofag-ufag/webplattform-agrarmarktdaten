import * as GQL from "@/graphql";
import { client } from "@/graphql/api";
import { AppLayout } from "@/components/layout";
import { Hero } from "@/components/hero";
import { TopBlogpostsTeaser } from "@/components/TopBlogpostsTeaser";
import { StructuredText } from "@/components/StructuredText";
import { GridContainer, GridElement } from "@/components/Grid";
import { useTheme } from "@mui/material/styles";
import { TableOfContents } from "@/components/TableOfContents";
import { useStickyBox } from "react-sticky-box";
import { gridColumn } from "@/components/Grid/Grid";

export default function MethodsPage(props: GQL.MethodsPageQuery) {
  const { methodsPage, allMarketArticles, allFocusArticles, topBlogPosts } = props;
  const stickyRef = useStickyBox({ offsetTop: 200 });
  const theme = useTheme();
  if (!methodsPage?.title || !methodsPage.lead) {
    return null;
  }
  return (
    <AppLayout allMarkets={allMarketArticles} allFocusArticles={allFocusArticles}>
      <Hero title={methodsPage.title} lead={methodsPage.lead} bgColor="#DFE4E9" shiftedLeft />
      <GridContainer sx={{ mt: 4, position: "relative" }}>
        <GridElement
          ref={stickyRef}
          sx={{
            height: "fit-content",
            [theme.breakpoints.down("xxxl")]: gridColumn(2),
            [theme.breakpoints.down("xxl")]: { display: "none" },
          }}
        >
          {methodsPage.content && (
            <TableOfContents
              data={methodsPage.content}
              sx={{ height: "fit-content", width: "100%" }}
            />
          )}
        </GridElement>
        <GridElement
          sx={{
            [theme.breakpoints.down("xxxl")]: gridColumn(9),
            [theme.breakpoints.down("xl")]: gridColumn(12),
            [theme.breakpoints.down("lg")]: gridColumn(6),
            [theme.breakpoints.down("sm")]: gridColumn(4),
          }}
        >
          {methodsPage.content && <StructuredText data={methodsPage.content} />}
        </GridElement>
      </GridContainer>
      <TopBlogpostsTeaser blogposts={topBlogPosts} />
    </AppLayout>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.MethodsPageQuery>(
      GQL.MethodsPageDocument,
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
