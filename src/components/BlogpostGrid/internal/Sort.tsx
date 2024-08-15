import { MenuItem, Select, Typography, FormLabel } from "@mui/material";
import { Trans } from "@lingui/macro";
import { makeStyles } from "@/components/style-utils";
import { getSortBy, SortBy } from "../utils";
import { useRouter } from "next/router";

const useStyles = makeStyles()((theme) => ({
  sortLabel: {
    color: theme.palette.monochrome[400],
    fontSize: "14px!important",
    marginRight: "5px",
    display: "inline",
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
  sortBy: string;
  onSelectSortBy: (sortBy: string) => void;
}

const Sort = (props: Props) => {
  const { sortBy, onSelectSortBy } = props;
  const { classes } = useStyles();
  const { locale } = useRouter();
  const sortByEnum = getSortBy(locale);
  return (
    <>
      <FormLabel>
        <Typography variant="body1" className={classes.sortLabel}>
          <Trans id="sort.labe">Sort by:</Trans>&nbsp;
        </Typography>
      </FormLabel>
      <Select
        className={classes.selectNaked}
        // FIXME: Need to work out the proper type here
        // @ts-ignore
        value={sortByEnum[sortBy]}
        onChange={(e) => {
          onSelectSortBy(e.target.value as SortBy);
        }}
        displayEmpty
        renderValue={(value) => <span>{value}</span>}
        inputProps={{ "aria-label": "Without label" }}
      >
        {Object.entries(sortByEnum).map(([sortByKey, sortByValue]) => {
          return (
            <MenuItem key={sortByValue} value={sortByKey} divider>
              {sortByValue}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
};

export default Sort;
