import { Box, SelectChangeEvent, useMediaQuery } from "@mui/material";
import * as GQL from "@/graphql";
import { GridContainer, GridWrap, GridWrapElement } from "@/components/Grid";
import { makeStyles } from "@/components/style-utils";
import { Trans } from "@lingui/macro";
import { getSearchBuildTrigger } from "@/domain/env";
import { client } from "@/lib/dato";
import * as React from "react";
import { SchemaTypes } from "@datocms/cma-client-browser";
import { useRouter } from "next/router";
import { useDebounce } from "@/lib/useDebounce";
import Search from "./Search";
import Sort from "./Sort";
import { Filter } from "./Filters";
import { useTheme } from "@mui/material/styles";
import MobileFilters from "./MobileFilters";

const useStyles = makeStyles()((theme) => ({
  sortRoot: {
    display: "flex",
    alignItems: "center",
  },
  sortContainer: {
    marginTop: "10px",
  },
  searchContainer: {
    width: "100%",
    display: "flex",
    alignItems: "end",
    [theme.breakpoints.down("xl")]: { marginRight: "20px", width: "100%" },
  },
}));

interface Props {
  markets: GQL.SimpleMarketArticleFragment[];
  selectedMarket: string;
  onSelectMarket: (e: SelectChangeEvent) => void;
  focusArticles: GQL.SimpleFocusArticleFragment[];
  selectedFocusArticle: string;
  onSelectFocusArticle: (e: SelectChangeEvent) => void;
  sortBy: string;
  onSelectSortBy: (sortBy: string) => void;
}

const Controls = (props: Props) => {
  const {
    markets,
    focusArticles,
    selectedMarket,
    onSelectMarket,
    selectedFocusArticle,
    onSelectFocusArticle,
    sortBy,
    onSelectSortBy,
  } = props;
  const { classes } = useStyles();

  const theme = useTheme();
  const isNotDesktop = useMediaQuery(theme.breakpoints.down("xl"));

  const { locale } = useRouter();
  const [searchString, setSearchString] = React.useState("");
  const [searchOptions, setSearchOptions] = React.useState([] as SchemaTypes.SearchResult[]);
  const [debouncedSearchString, setDebouncedSearchString] = useDebounce(searchString, 50);

  React.useEffect(() => {
    const search = async () => {
      const { data } = await client.searchResults.rawList({
        filter: {
          fuzzy: true,
          query: debouncedSearchString,
          build_trigger_id: `${getSearchBuildTrigger(locale)}`,
          locale,
        },
        page: { limit: 20, offset: 0 },
      });
      return data;
    };

    search().then((searchResults) => {
      setSearchOptions(searchResults);
    });
  }, [debouncedSearchString, locale]);

  return (
    <>
      <GridContainer disableItemMargin>
        <GridWrap>
          <GridWrapElement sx={{ [theme.breakpoints.down("xl")]: { display: "none" } }}>
            <Filter
              options={markets.sort((a, b) => a?.title?.localeCompare(b?.title ?? "") ?? 0)}
              selectedOption={selectedMarket}
              onSelectOption={onSelectMarket}
              label={<Trans id="filter.market">Market</Trans>}
            />
          </GridWrapElement>
          <GridWrapElement sx={{ [theme.breakpoints.down("xl")]: { display: "none" } }}>
            <Filter
              options={focusArticles.sort((a, b) => a?.title?.localeCompare(b?.title ?? "") ?? 0)}
              selectedOption={selectedFocusArticle}
              onSelectOption={onSelectFocusArticle}
              label={<Trans id="filter.focus">Focus</Trans>}
            />
          </GridWrapElement>
          <GridWrapElement full={isNotDesktop} sx={{ display: "flex" }}>
            <Box className={classes.searchContainer}>
              <Search
                searchString={searchString}
                setSearchString={setSearchString}
                options={searchOptions}
                onReset={() => {
                  setSearchOptions([]);
                  //We need to manually clear this otherwise if the user types too fast it won't clear and we get unwanted results
                  setDebouncedSearchString("");
                }}
              />
            </Box>
            {isNotDesktop && (
              <MobileFilters
                markets={markets}
                selectedMarket={selectedMarket}
                onSelectMarket={onSelectMarket}
                focusArticles={focusArticles}
                selectedFocusArticle={selectedFocusArticle}
                onSelectFocusArticle={onSelectFocusArticle}
              />
            )}
          </GridWrapElement>
        </GridWrap>
      </GridContainer>
      <GridContainer className={classes.sortContainer}>
        <GridWrap>
          <GridWrapElement className={classes.sortRoot}>
            <Sort sortBy={sortBy} onSelectSortBy={onSelectSortBy} />
          </GridWrapElement>
        </GridWrap>
      </GridContainer>
    </>
  );
};

export default Controls;
