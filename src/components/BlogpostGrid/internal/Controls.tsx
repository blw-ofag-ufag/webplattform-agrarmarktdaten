import { MenuItem, Select, SelectChangeEvent, Typography, FormLabel, Box } from "@mui/material";
import * as GQL from "@/graphql";
import { GridContainer, GridWrap, GridWrapElement /* , GridElement */ } from "@/components/Grid";
import DoneIcon from "@mui/icons-material/Done";
import { makeStyles } from "@/components/style-utils";
import { SortBy } from "../BlogpostGrid";
import { Trans } from "@lingui/macro";

const useStyles = makeStyles()(() => ({
  menuItem: {
    display: "flex",
    justifyContent: "space-between",
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
  return (
    <>
      <GridContainer>
        <GridWrap>
          <GridWrapElement>
            <FormLabel>
              <Trans id="filter.market">Market</Trans>
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
            <Box>
              <FormLabel>
                <Trans id="filter.focus">Focus</Trans>
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
                <MenuItem value="all" divider>
                  <Trans id="select.all">All</Trans>
                </MenuItem>
                {focusArticles.map((focusArticle) => (
                  <MenuItem key={focusArticle.id} value={focusArticle.id} divider>
                    {focusArticle.title}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </GridWrapElement>
        </GridWrap>
      </GridContainer>
      <GridContainer>
        <GridWrap>
          <GridWrapElement>
            <FormLabel>
              <Trans id="sort.labe">Sort by:</Trans>&nbsp;
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
