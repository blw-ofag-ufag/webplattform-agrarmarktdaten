import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  FormLabel,
  Box,
  Autocomplete,
  TextField,
  InputAdornment,
} from "@mui/material";
import * as GQL from "@/graphql";
import { GridContainer, GridWrap, GridWrapElement /* , GridElement */ } from "@/components/Grid";
import DoneIcon from "@mui/icons-material/Done";
import { makeStyles } from "@/components/style-utils";
import { SortBy } from "../BlogpostGrid";
import { Trans } from "@lingui/macro";
import { SEARCH_BUILD_TRIGGER } from "@/domain/env";
import { client } from "@/lib/dato";
import * as React from "react";
import { SchemaTypes } from "@datocms/cma-client-browser";
import { useRouter } from "next/router";
import { useDebounce } from "@/lib/useDebounce";
import SearchIcon from "@/icons/icons-jsx/control/IcSearch";

const useStyles = makeStyles()((theme) => ({
  menuItem: {
    display: "flex",
    justifyContent: "space-between",
  },
  label: {
    color: theme.palette.text.primary,
    marginBottom: "6px",
  },
}));

function highlightMatches(string: string, highlight: string) {
  return string.replace(/\[h\](.+?)\[\/h\]/g, function (_a, b) {
    const div = document.createElement("div");
    div.innerHTML = highlight;
    //@ts-ignore
    div.children[0].innerText = b;
    return div.children[0].outerHTML;
  });
}

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

  const { locale, push } = useRouter();
  const [searchString, setSearchString] = React.useState("");
  const [searchOptions, setSearchOptions] = React.useState([] as SchemaTypes.SearchResult[]);
  const debouncedSearchString = useDebounce(searchString, 200);

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
            <FormLabel>
              <Typography variant="body1" className={classes.label}>
                <Trans id="filter.market">Market</Trans>
              </Typography>
            </FormLabel>
            <Select
              value={selectedMarket}
              onChange={onSelectMarket}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              renderValue={(value) => {
                const marketTitle = markets.filter((m) => m.id === value)[0]?.title;
                return <Typography variant="body1">{marketTitle ?? "All"}</Typography>;
              }}
            >
              <MenuItem className={classes.menuItem} value="all" divider>
                <Trans id="select.all">All</Trans>
                {selectedMarket === "all" && <DoneIcon />}
              </MenuItem>
              {markets.map((market) => (
                <MenuItem className={classes.menuItem} key={market.id} value={market.id} divider>
                  {market.title}
                  {selectedMarket === market.id && <DoneIcon />}
                </MenuItem>
              ))}
            </Select>
          </GridWrapElement>
          <GridWrapElement>
            <FormLabel>
              <Typography variant="body1" className={classes.label}>
                <Trans id="filter.focus">Focus</Trans>
              </Typography>
            </FormLabel>
            <Select
              value={selectedFocusArticle}
              onChange={onSelectFocusArticle}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              renderValue={(value) => {
                const focusArticleTitle = focusArticles.filter((m) => m.id === value)[0]?.title;
                return <Typography variant="body1">{focusArticleTitle ?? "All"}</Typography>;
              }}
            >
              <MenuItem value="all" divider className={classes.menuItem}>
                <Trans id="select.all">All</Trans>
                {selectedFocusArticle === "all" && <DoneIcon />}
              </MenuItem>
              {focusArticles.map((focusArticle) => (
                <MenuItem
                  key={focusArticle.id}
                  value={focusArticle.id}
                  divider
                  className={classes.menuItem}
                >
                  {focusArticle.title}
                  {selectedFocusArticle === focusArticle.id && <DoneIcon />}
                </MenuItem>
              ))}
            </Select>
          </GridWrapElement>
          <GridWrapElement>
            <FormLabel>
              <Typography variant="body1" className={classes.label}>
                <Trans id="search.label">Search</Trans>
              </Typography>
            </FormLabel>

            <Autocomplete
              id="search"
              open
              getOptionLabel={(option) => option.attributes?.highlight.body?.[0] ?? ""}
              onInputChange={(e, value, reason) => {
                if (reason === "reset") {
                  setSearchOptions([]);
                }
              }}
              renderOption={(props, option) => {
                if (option.attributes?.highlight.body?.[0]) {
                  const highlight = highlightMatches(
                    option.attributes?.highlight.body?.[0],
                    "<strong></strong>"
                  );
                  return (
                    <MenuItem
                      {...props}
                      key={option.id}
                      sx={{ whiteSpace: "normal", height: "fit-content" }}
                    >
                      <span dangerouslySetInnerHTML={{ __html: highlight }} />
                    </MenuItem>
                  );
                }
              }}
              onChange={(_e, option) => {
                if (option?.attributes.url) {
                  push(option?.attributes.url);
                }
              }}
              options={searchOptions.map((option) => option)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search"
                  variant="outlined"
                  value={searchString}
                  InputLabelProps={{ shrink: false }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon width={24} height={24} color={"#596978"} />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setSearchString(e.target.value)}
                />
              )}
            />
          </GridWrapElement>
        </GridWrap>
      </GridContainer>
      <GridContainer>
        <GridWrap>
          <GridWrapElement>
            <FormLabel>
              <Typography variant="body1" className={classes.label}>
                <Trans id="sort.labe">Sort by:</Trans>&nbsp;
              </Typography>
            </FormLabel>
            <Select
              value={sortBy}
              onChange={(e) => onSelectSortBy(e.target.value as SortBy)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {(Object.keys(SortBy) as Array<keyof typeof SortBy>).map((sortByElem) => (
                <MenuItem key={sortByElem} value={SortBy[sortByElem]} divider>
                  {sortByElem}
                </MenuItem>
              ))}
            </Select>
          </GridWrapElement>
        </GridWrap>
      </GridContainer>
    </>
  );
};

export default Controls;
