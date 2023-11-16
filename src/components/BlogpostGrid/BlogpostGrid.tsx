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
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  useQueryState,
  parseAsString,
  parseAsInteger,
  parseAsStringEnum,
} from "next-usequerystate";
import dynamic from "next/dynamic";
import { getSortBy } from "./utils";

const Controls = dynamic(() => import("./internal/Controls"), { ssr: false });

interface Props {
  markets: GQL.SimpleMarketArticleFragment[];
  focusArticles: GQL.SimpleFocusArticleFragment[];
}

const BlogPostGrid = (props: Props) => {
  const { markets, focusArticles } = props;
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const theme = useTheme();
  const { locale } = useRouter();
  const shouldShowFullCard = useMediaQuery(theme.breakpoints.up("lg"));
  const [market, setMarket] = useQueryState("market", parseAsString.withDefault("all"));
  const [focusArticle, setFocusArticle] = useQueryState("focus", parseAsString.withDefault("all"));
  const sortBy = getSortBy(locale);
  const [order, setOrder] = useQueryState(
    "order",
    parseAsStringEnum(Object.keys(sortBy)).withDefault("publishedDate_DESC")
  );

  const handleMarketChange = (event: SelectChangeEvent) => {
    setMarket(event.target.value as string);
  };

  const handleFocusArticleChange = (event: SelectChangeEvent) => {
    setFocusArticle(event.target.value as string);
  };

  const { data } = useQuery({
    queryKey: ["blogposts", page, market, focusArticle, order],
    queryFn: async () => {
      const first = page === 1 ? 7 : 9;
      //first page has 7 articles, the remaining ones have 9
      const skip = page === 1 ? 0 : (page - 2) * 9 + 7;

      const filtersArePresent = market !== "all" || focusArticle !== "all";

      const result = await client
        .query<GQL.PaginatedBlogpostsQuery>(
          filtersArePresent
            ? GQL.PaginatedFilteredBlogpostsDocument
            : GQL.PaginatedBlogpostsDocument,
          {
            locale,
            first,
            skip,
            orderBy: order,
            ...(market !== "all" && { marketFilter: market }),
            ...(focusArticle !== "all" && { focusFilter: focusArticle }),
          }
        )
        .toPromise();

      if (!result.data) {
        console.error(result.error?.toString());
        throw new Error("Failed to fetch API");
      }

      return result.data;
    },
    placeholderData: keepPreviousData,
  });

  return (
    <Box sx={{ backgroundColor: c.cobalt[50], py: 8 }}>
      <Controls
        markets={markets}
        focusArticles={focusArticles}
        selectedMarket={market}
        onSelectMarket={handleMarketChange}
        selectedFocusArticle={focusArticle}
        onSelectFocusArticle={handleFocusArticleChange}
        sortBy={order}
        onSelectSortBy={setOrder}
      />
      <GridContainer
        sx={{ display: "flex", flexDirection: "column", mt: "10px", mb: "40px" }}
        disableItemMargin
      >
        <GridWrap>
          {data?.blogposts?.map((blogpost, i) => {
            return (
              <GridWrapElement key={blogpost.id} full={page === 1 && i === 0 && shouldShowFullCard}>
                <BlogpostCard
                  {...blogpost}
                  variant={page === 1 && i === 0 && shouldShowFullCard ? "full" : "third"}
                />
              </GridWrapElement>
            );
          })}
          {data?.blogpostCount && (
            <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
              <Pagination
                //first page has 7 articles, the remaining ones have 9
                total={
                  data?.blogpostCount.count < 8
                    ? 1
                    : Math.ceil((data?.blogpostCount.count - 7) / 9) + 1
                }
                current={page}
                onChange={(_, page) => {
                  setPage(page);
                }}
              />
            </Box>
          )}
        </GridWrap>
      </GridContainer>
    </Box>
  );
};

export default BlogPostGrid;
