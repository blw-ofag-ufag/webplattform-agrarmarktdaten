import { timeAtom } from "@/domain/data";
import { Trans } from "@lingui/macro";
import {
  Button,
  Divider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  toggleButtonClasses,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAtom } from "jotai";
import { withStyles } from "../style-utils";

const FilterToggleButton = withStyles(ToggleButton, (theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    textTransform: "none",
    border: "1px solid",
    borderColor: theme.palette.grey[500],

    [`&.${toggleButtonClasses.selected}`]: {
      backgroundColor: theme.palette.grey[700],

      color: theme.palette.grey[50],
      "&:hover": {
        backgroundColor: theme.palette.grey[800],
      },
    },
  },
}));

export default function TimeFilter() {
  const [time, setTime] = useAtom(timeAtom);

  return (
    <Stack gap={1}>
      <Button
        variant="text"
        sx={{
          width: "fit-content",
          color: "grey.600",
        }}
      >
        <Trans id="data.control.reset">Reset</Trans>
      </Button>
      <ToggleButtonGroup
        size="small"
        fullWidth
        value={time}
        exclusive
        onChange={(_, value) => setTime(value)}
      >
        <FilterToggleButton value="year">
          <Trans id="data.filters.year">Year</Trans>
        </FilterToggleButton>
        <FilterToggleButton value="month">
          <Trans id="data.filters.month">Month</Trans>
        </FilterToggleButton>
      </ToggleButtonGroup>
      <Stack
        direction="row"
        spacing={1}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start"
            views={time === "year" ? ["year"] : ["year", "month"]}
          />
          <DatePicker
            label="End"
            views={time === "year" ? ["year"] : ["year", "month"]}
          />
        </LocalizationProvider>
      </Stack>
    </Stack>
  );
}
