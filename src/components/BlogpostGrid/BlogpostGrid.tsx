import * as React from "react";
import * as GQL from "@/graphql";
import { Box, useMediaQuery } from "@mui/material";
import { BlogpostCard } from "@/components/BlogpostCard";
import { c } from "@interactivethings/swiss-federal-ci";
import { Pagination } from "@/components/Pagination";
import { useTheme } from "@mui/material/styles";
import { GridContainer, GridElement, GridWrap, GridWrapElement } from "@/components/Grid";

interface Props {
  blogposts: GQL.SimpleBlogPostFragment[];
  isFirstPage: boolean;
}

const BlogPostGrid = (props: Props) => {
  const { blogposts, isFirstPage } = props;
  const [current, setCurrent] = React.useState(1);
  const theme = useTheme();
  const shouldShowFullCard = useMediaQuery(theme.breakpoints.up("lg"));

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
          {blogposts.map((blogpost, i) => {
            if (isFirstPage && i === 0 && shouldShowFullCard) {
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
              total={10}
              current={current}
              onChange={(_, page) => {
                setCurrent(page);
              }}
            />
          </Box>
        </GridWrap>
      </GridContainer>
    </Box>
  );
};

export default BlogPostGrid;
