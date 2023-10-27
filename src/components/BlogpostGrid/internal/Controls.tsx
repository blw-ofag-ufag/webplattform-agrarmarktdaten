import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as GQL from "@/graphql";
// import { Box } from "@mui/material";
import { GridContainer, GridElement } from "@/components/Grid";
import DoneIcon from "@mui/icons-material/Done";

interface Props {
  markets: GQL.SimpleMarketArticleFragment[];
  selectedMarket: string;
  onSelectMarket: (e: SelectChangeEvent) => void;
  focusArticles: GQL.SimpleFocusArticleFragment[];
  selectedFocusArticle: string;
  onSelectFocusArticle: (e: SelectChangeEvent) => void;
}

const Controls = (props: Props) => {
  const {
    markets,
    focusArticles,
    selectedMarket,
    onSelectMarket,
    selectedFocusArticle,
    onSelectFocusArticle,
  } = props;
  return (
    <GridContainer>
      <GridElement xxxl={4} xxl={4} xl={4}>
        <Select
          value={selectedMarket}
          onChange={onSelectMarket}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="all" divider>
            <em>All</em>
          </MenuItem>
          {markets.map((market) => (
            <MenuItem key={market.id} value={market.id} divider>
              {market.title}
              {selectedMarket === market.id && <DoneIcon />}
            </MenuItem>
          ))}
        </Select>
      </GridElement>
      <GridElement xxxl={4} xxl={4} xl={4}>
        <Select
          value={selectedFocusArticle}
          onChange={onSelectFocusArticle}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="all" divider>
            <em>All</em>
          </MenuItem>
          {focusArticles.map((focusArticle) => (
            <MenuItem key={focusArticle.id} value={focusArticle.id} divider>
              {focusArticle.title}
            </MenuItem>
          ))}
        </Select>
      </GridElement>
    </GridContainer>
  );
};

export default Controls;
