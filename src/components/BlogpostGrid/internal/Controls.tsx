import { SelectChangeEvent } from "@mui/material";
import * as GQL from "@/graphql";
import { GridContainer, GridWrap, GridWrapElement } from "@/components/Grid";
import { makeStyles } from "@/components/style-utils";
import { SortBy } from "../BlogpostGrid";
import { Trans } from "@lingui/macro";
import { SEARCH_BUILD_TRIGGER } from "@/domain/env";
import { client } from "@/lib/dato";
import * as React from "react";
import { SchemaTypes } from "@datocms/cma-client-browser";
import { useRouter } from "next/router";
import { useDebounce } from "@/lib/useDebounce";
import Search from "./Search";
import Sort from "./Sort";
import { Filter } from "./Filters";

const useStyles = makeStyles()(() => ({
  sortRoot: {
    display: "flex",
    alignItems: "center",
  },
  sortContainer: {
    marginTop: "10px",
  },
}));

interface Props {
  markets: GQL.SimpleMarketArticleFragment[];
  selectedMarket: string;
  onSelectMarket: (e: SelectChangeEvent) => void;
  focusArticles: GQL.SimpleFocusArticleFragment[];
  selectedFocusArticle: string;
  onSelectFocusArticle: (e: SelectChangeEvent) => void;
  sortBy: SortBy;
  onSelectSortBy: (sortBy: SortBy) => void;
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
          build_trigger_id: `${SEARCH_BUILD_TRIGGER}`,
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
      <GridContainer>
        <GridWrap>
          <GridWrapElement>
            <Filter
              options={markets}
              selectedOption={selectedMarket}
              onSelectOption={onSelectMarket}
              label={<Trans id="filter.market">Market</Trans>}
            />
          </GridWrapElement>
          <GridWrapElement>
            <Filter
              options={focusArticles}
              selectedOption={selectedFocusArticle}
              onSelectOption={onSelectFocusArticle}
              label={<Trans id="filter.focus">Focus</Trans>}
            />
          </GridWrapElement>
          <GridWrapElement>
            <Search
              searchString={searchString}
              setSearchString={setSearchString}
              options={searchOptions}
              onReset={() => {
                setSearchOptions([]);
                //We need to manually clear this otherwise if the user types too fast it won't clear and we get unwanted results
                setDebouncedSearchString("");
              }}
              showLabel
            />
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
