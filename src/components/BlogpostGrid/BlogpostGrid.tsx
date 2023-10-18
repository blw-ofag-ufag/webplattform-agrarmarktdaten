import * as React from "react";
import * as GQL from "@/graphql";
import { Box, useMediaQuery } from "@mui/material";
import { BlogpostCard } from "@/components/BlogpostCard";
import { c } from "@interactivethings/swiss-federal-ci";
import { Pagination } from "@/components/Pagination";
import { useTheme } from "@mui/material/styles";
import { GridContainer, GridElement, GridWrap, GridWrapElement } from "@/components/Grid";
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
  const shouldShowFullCard = useMediaQuery(theme.breakpoints.up("lg"));
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
      <GridContainer sx={{ display: "flex", flexDirection: "column", mt: "40px", mb: "40px" }}>
        <GridWrap
          sx={{
            [theme.breakpoints.only("xxxl")]: { maxWidth: "1676px" },
            [theme.breakpoints.only("xxl")]: { maxWidth: "1544px" },
            [theme.breakpoints.only("xl")]: {
              maxWidth: "1152px",
              columnGap: "48px",
              rowGap: "32px",
            },
            [theme.breakpoints.only("lg")]: {
              maxWidth: "928px",
              columnGap: "40px",
              rowGap: "32px",
            },
            [theme.breakpoints.only("md")]: {
              maxWidth: "696px",
              columnGap: "36px",
              rowGap: "32px",
            },
            [theme.breakpoints.only("sm")]: {
              maxWidth: "568px",
              columnGap: "35px",
              rowGap: "32px",
            },
            [theme.breakpoints.only("xs")]: { maxWidth: "424px", rowGap: "32px" },
            [theme.breakpoints.only("xxs")]: { maxWidth: "340px", rowGap: "32px" },
          }}
        >
          {data?.map((blogpost, i) => {
            if (page === 1 && i === 0 && shouldShowFullCard) {
              return (
                <GridElement sx={{ width: "100%!important" }} key={blogpost.id}>
                  <BlogpostCard {...blogpost} variant="full" />
                </GridElement>
              );
            }
            return (
              <GridWrapElement key={blogpost.id}>
                <BlogpostCard {...blogpost} />
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
