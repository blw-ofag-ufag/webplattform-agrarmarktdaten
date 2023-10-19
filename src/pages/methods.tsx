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

export default function MethodsPage(props: GQL.MethodsPageQuery) {
  const { methodsPage, allMarketArticles, allFocusArticles, topBlogPosts } = props;
  const stickyRef = useStickyBox({ offsetTop: 200 });
  const theme = useTheme();
  if (!methodsPage?.title || !methodsPage.lead) {
    return null;
  }
  return (
    <AppLayout allMarkets={allMarketArticles} allFocusArticles={allFocusArticles}>
      <Hero title={methodsPage.title} lead={methodsPage.lead} bgColor="#DFE4E9" shifted />
      <GridContainer sx={{ mt: 4, position: "relative" }}>
        <GridElement
          ref={stickyRef}
          sx={{
            height: "fit-content",
            [theme.breakpoints.only("xxxl")]: { width: "calc(81px * 2 + 64px)" },
            [theme.breakpoints.only("xxl")]: { width: "calc(70px * 2 + 64px)" },
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
            [theme.breakpoints.only("xxxl")]: { width: "calc(81px * 8 + 64px * 7)", ml: "64px" },
            [theme.breakpoints.only("xxl")]: { width: "calc(70px * 8 + 64px * 7)", ml: "64px" },
            [theme.breakpoints.only("xl")]: {
              width: "calc(52px * 10 + 48px * 9)",
              ml: "calc(52px + 48px)",
              mr: "calc(52px + 48px)",
            },
          }}
          xxxl={9}
          xxl={9}
          xl={9}
          lg={6}
          md={6}
          sm={4}
          xs={4}
          xxs={4}
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
    .query<GQL.MethodsPageQuery>(GQL.MethodsPageDocument, {
      locale: context.locale,
    })
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return { props: result.data };
};
