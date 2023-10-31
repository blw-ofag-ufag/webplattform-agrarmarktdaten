import * as React from "react";
import * as GQL from "@/graphql";
import { Box, useMediaQuery } from "@mui/material";
import { BlogpostCard } from "@/components/BlogpostCard";
import { c } from "@interactivethings/swiss-federal-ci";
import { Pagination } from "@/components/Pagination";
import { useTheme } from "@mui/material/styles";
import { GridWrap, GridWrapElement, GridContainer } from "@/components/Grid";
import { client } from "@/graphql";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

interface Props {
  blogposts: GQL.SimpleBlogPostFragment[];
  totalBlogpostCount: number;
}

const BlogPostGrid = (props: Props) => {
  const { blogposts, totalBlogpostCount } = props;
  const [page, setPage] = React.useState(1);
  const theme = useTheme();
  const { locale } = useRouter();
  const isLargeOrBigger = useMediaQuery(theme.breakpoints.up("lg"));
  const { data } = useQuery(
    ["blogposts", page],
    async () => {
      const first = page === 1 ? 7 : 9;
      //first page has 7 articles, the remaining ones have 9
      const skip = page === 1 ? 0 : (page - 2) * 9 + 7;

      const result = await client
        .query<GQL.PaginatedBlogpostsQuery>(GQL.PaginatedBlogpostsDocument, { locale, first, skip })
        .toPromise();

      if (!result.data?.allBlogPosts) {
        console.error(result.error?.toString());
        throw new Error("Failed to fetch API");
      }

      return result.data?.allBlogPosts;
    },
    {
      initialData: blogposts,
      keepPreviousData: true,
    }
  );

  return (
    <Box sx={{ backgroundColor: c.cobalt[50], py: 8 }}>
      <GridContainer
        sx={{ display: "flex", flexDirection: "column", mt: "40px", mb: "40px" }}
        disableItemMargin
      >
        <GridWrap>
          {data?.map((blogpost, i) => {
            return (
              <GridWrapElement key={blogpost.id} full={page === 1 && i === 0 && isLargeOrBigger}>
                <BlogpostCard
                  {...blogpost}
                  variant={page === 1 && i === 0 && isLargeOrBigger ? "full" : "third"}
                />
              </GridWrapElement>
            );
          })}
          <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Pagination
              //first page has 7 articles, the remaining ones have 9
              total={totalBlogpostCount < 8 ? 1 : Math.ceil((totalBlogpostCount - 7) / 9) + 1}
              current={page}
              onChange={(_, page) => {
                setPage(page);
              }}
            />
          </Box>
        </GridWrap>
      </GridContainer>
    </Box>
  );
};

export default BlogPostGrid;
