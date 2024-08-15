import { MenuItem, Select, Typography, FormLabel, SelectChangeEvent } from "@mui/material";
import { Trans } from "@lingui/macro";
import DoneIcon from "@mui/icons-material/Done";
import { makeStyles } from "@/components/style-utils";

const useStyles = makeStyles()((theme) => ({
  label: {
    color: theme.palette.monochrome[800],
    fontSize: "18px!important",
    marginBottom: "8px",
  },
  menuItem: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

interface Option {
  id: string;
  title?: string | null;
  slug?: string | null;
}

interface Props {
  options: Option[];
  selectedOption: string;
  onSelectOption: (e: SelectChangeEvent) => void;
  label: React.ReactNode;
}

export const Filter = (props: Props) => {
  const { options, selectedOption, onSelectOption, label } = props;
  const { classes } = useStyles();
  return (
    <>
      <FormLabel>
        <Typography variant="body1" className={classes.label}>
          {label}
        </Typography>
      </FormLabel>
      <Select
        value={selectedOption}
        onChange={onSelectOption}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        renderValue={(value) => {
          const marketTitle = options.filter((m) => m.id === value)[0]?.title;
          return (
            <Typography variant="body1">
              {marketTitle ?? <Trans id="select.all">All</Trans>}
            </Typography>
          );
        }}
      >
        <MenuItem className={classes.menuItem} value="all" divider>
          <Trans id="select.all">All</Trans>
          {selectedOption === "all" && <DoneIcon />}
        </MenuItem>
        {options.map((option) => (
          <MenuItem className={classes.menuItem} key={option.id} value={option.id} divider>
            {option.title}
            {selectedOption === option.id && <DoneIcon />}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
