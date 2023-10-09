import { TimeGranularity, timeAtom } from "@/domain/data";
import { IcControlCalendar } from "@/icons/icons-jsx/control";
import { useLocale } from "@/lib/use-locale";
import { Trans, t } from "@lingui/macro";
import {
  Button,
  Divider,
  InputLabel,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  toggleButtonClasses,
} from "@mui/material";
import {
  DatePicker,
  DatePickerProps,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/de";
import "dayjs/locale/fr";
import "dayjs/locale/it";
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
  const locale = useLocale();

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
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
        <Stack direction="row" spacing={3} alignItems="end">
          <DatePickerField
            time={time}
            label={t({ id: "data.filters.from", message: "From" })}
            views={time === "year" ? ["year"] : ["year", "month"]}
          />
          <Divider
            orientation="horizontal"
            sx={{
              position: "relative",
              bottom: "20px",
              width: "12px",
              height: "1px",
              border: "none",
              backgroundColor: "grey.800",
            }}
          />
          <DatePickerField
            time={time}
            label={t({ id: "data.filters.from", message: "To" })}
            views={time === "year" ? ["year"] : ["year", "month"]}
          />
        </Stack>
      </LocalizationProvider>
    </Stack>
  );
}

const DatePickerField = ({
  time,
  label,
  ...props
}: {
  time: TimeGranularity;
  label: string;
} & DatePickerProps<Dayjs>) => {
  return (
    <Stack>
      <InputLabel shrink={false} htmlFor={`picker-${label}`}>
        <Typography variant="caption">{label}</Typography>
      </InputLabel>
      <DatePicker
        minDate={dayjs("2020-01")}
        maxDate={dayjs("2023-01")}
        format={time === "year" ? "YYYY" : "MM.YYYY"}
        views={time === "year" ? ["year"] : ["year", "month"]}
        slots={{
          openPickerIcon: IcControlCalendar,
        }}
        slotProps={{
          textField: {
            size: "small",
            id: "picker-from",
            InputLabelProps: {
              shrink: true,
            },
          },
        }}
        {...props}
      />
    </Stack>
  );
};
