import { MenuItem, Select, Typography, FormLabel } from "@mui/material";
import { Trans } from "@lingui/macro";
import { SortBy } from "../BlogpostGrid";
import { makeStyles } from "@/components/style-utils";

const useStyles = makeStyles()((theme) => ({
  sortLabel: {
    color: theme.palette.monochrome[400],
    fontSize: "14px!important",
    marginRight: "5px",
  },
  //Could not add a new variant in the there so styled things here for the moment
  selectNaked: {
    backgroundColor: "transparent",
    width: "fit-content",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiSelect-icon": {
      fontSize: "1rem",
    },
    ".MuiInputBase-input": {
      paddingRight: "25px!important",
    },
    ".MuiOutlinedInput-input": {
      fontSize: "14px",
      padding: 0,
    },
  },
}));

interface Props {
  sortBy: SortBy;
  onSelectSortBy: (sortBy: SortBy) => void;
}

const Sort = (props: Props) => {
  const { sortBy, onSelectSortBy } = props;
  const { classes } = useStyles();
  return (
    <>
      <FormLabel>
        <Typography variant="body1" className={classes.sortLabel}>
          <Trans id="sort.labe">Sort by:</Trans>&nbsp;
        </Typography>
      </FormLabel>
      <Select
        className={classes.selectNaked}
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
    </>
  );
};

export default Sort;
