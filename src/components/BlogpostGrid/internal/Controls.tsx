import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as GQL from "@/graphql";
import { GridContainer, GridElement } from "@/components/Grid";
import DoneIcon from "@mui/icons-material/Done";
import { makeStyles } from "@/components/style-utils";
import { Typography, FormLabel } from "@mui/material";
import { SortBy } from "../BlogpostGrid";

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
        <GridElement xxxl={4} xxl={4} xl={4}>
          <FormLabel>Market</FormLabel>
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
              All
              {selectedMarket === "all" && <DoneIcon />}
            </MenuItem>
            {markets.map((market) => (
              <MenuItem className={classes.menuItem} key={market.id} value={market.id} divider>
                {market.title}
                {selectedMarket === market.id && <DoneIcon />}
              </MenuItem>
            ))}
          </Select>
        </GridElement>
        <GridElement xxxl={4} xxl={4} xl={4}>
          <FormLabel>Focus</FormLabel>
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
              All
            </MenuItem>
            {focusArticles.map((focusArticle) => (
              <MenuItem key={focusArticle.id} value={focusArticle.id} divider>
                {focusArticle.title}
              </MenuItem>
            ))}
          </Select>
        </GridElement>
      </GridContainer>
      <GridContainer>
        <GridElement xxxl={4} xxl={4} xl={4}>
          <FormLabel>Sort by: </FormLabel>
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
        </GridElement>
      </GridContainer>
    </>
  );
};

export default Controls;
