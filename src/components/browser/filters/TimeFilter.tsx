import { TimeView } from "@/domain/filters";
import { IcControlCalendar } from "@/icons/icons-jsx/control";
import { useLocale } from "@/lib/use-locale";
import { Trans, t } from "@lingui/macro";
import {
  Button,
  Divider,
  InputLabel,
  Slider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  sliderClasses,
  toggleButtonClasses,
} from "@mui/material";
import { DatePicker, DatePickerProps, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/de";
import "dayjs/locale/fr";
import "dayjs/locale/it";
import { useEffect, useMemo, useState } from "react";
import { makeStyles, withStyles } from "../../style-utils";

const useStyles = makeStyles()(({ palette: c }) => ({
  divider: {
    position: "relative",
    bottom: "20px",
    width: "12px",
    height: "1px",
    border: "none",
    backgroundColor: c.grey[800],
  },
}));

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

const TimeSlider = withStyles(Slider, (theme) => ({
  root: {
    [`& .${sliderClasses.rail}`]: {
      backgroundColor: theme.palette.grey[600],
    },
    [`& .${sliderClasses.track}`]: {
      height: "2px",
      borderRadius: "4px",
    },
    [`& .${sliderClasses.thumb}`]: {
      height: "16px",
      width: "16px",
      borderRadius: "50%",
      backgroundColor: theme.palette.grey[800],
      [`&:hover, &:focus, &.${sliderClasses.active}`]: {
        /* hardcoded, but probably will be changed with the new theme anyway */
        boxShadow: "0px 0px 0px 4px rgba(68, 68, 68, 0.16);",
      },
    },
    [`& .${sliderClasses.mark}`]: {
      display: "none",
    },
    [`& .${sliderClasses.markLabel}`]: {
      top: "24px",
    },
  },
}));

const formatTimeView = (view: TimeView) => (view === "year" ? "YYYY" : "MM.YYYY");

export default function TimeFilter({
  min,
  max,
  value,
  view,
  onChangeRange = () => {},
  onChangeView = () => {},
}: {
  min: number;
  max: number;
  value: [number, number];
  view: TimeView;
  onChangeRange?: (newValues: [number, number]) => void;
  onChangeView?: (newGranularity: TimeView) => void;
}) {
  const { classes } = useStyles();
  const minDate = useMemo(() => dayjs.unix(min), [min]);
  const maxDate = useMemo(() => dayjs.unix(max), [max]);
  const [sliderRange, setSliderRange] = useState(value);

  useEffect(() => {
    setSliderRange(value);
  }, [value]);

  const locale = useLocale();

  const timeFormat = useMemo(() => formatTimeView(view), [view]);

  const sliderValues = useMemo(() => {
    const getMark = (date: Dayjs, showLabel: boolean = false) => ({
      value: date.unix(),
      ...(showLabel && { label: date.format(timeFormat) }),
    });

    const values = [getMark(minDate, true)];

    let current = minDate.clone();
    while (current.isBefore(maxDate) && !current.isSame(maxDate)) {
      current = current.add(1, view);
      if (!current.isSame(maxDate)) {
        values.push(getMark(current));
      }
    }

    values.push(getMark(maxDate, true));

    return values;
  }, [minDate, maxDate, view, timeFormat]);

  return (
    <Stack gap={3}>
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
        value={view}
        exclusive
        onChange={(_, value) => onChangeView(value)}
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
            min={minDate}
            max={maxDate}
            label={t({ id: "data.filters.from", message: "From" })}
            views={view === "year" ? ["year"] : ["year", "month"]}
            format={timeFormat}
            value={dayjs.unix(value[0])}
            onChange={(date) => {
              if (date) onChangeRange([date.unix(), value[1]]);
            }}
          />
          <Divider orientation="horizontal" className={classes.divider} />
          <DatePickerField
            min={minDate}
            max={maxDate}
            label={t({ id: "data.filters.to", message: "To" })}
            views={view === "year" ? ["year"] : ["year", "month"]}
            format={timeFormat}
            value={dayjs.unix(value[1])}
            onChange={(date) => {
              if (date) onChangeRange([value[0], date.unix()]);
            }}
          />
        </Stack>
        <TimeSlider
          value={sliderRange}
          min={min}
          max={max}
          step={null}
          size="small"
          marks={sliderValues}
          onChange={(_, value) => setSliderRange(value as [number, number])}
          onChangeCommitted={(_, value) => onChangeRange(value as [number, number])}
          sx={{
            [`& .${sliderClasses.markLabel}[data-index="0"]`]: {
              transform: "translateX(0%)",
            },
            [`& .${sliderClasses.markLabel}[data-index="${sliderValues.length - 1}"]`]: {
              transform: "translateX(-100%)",
            },
          }}
        />
      </LocalizationProvider>
    </Stack>
  );
}

export const previewTime = (min: number, max: number, view: TimeView) => {
  return `${dayjs.unix(min).format(formatTimeView(view))} - ${dayjs
    .unix(max)
    .format(formatTimeView(view))}`;
};

const DatePickerField = ({
  min,
  max,
  label,
  ...props
}: {
  min: Dayjs;
  max: Dayjs;
  format: string;
  label: string;
} & DatePickerProps<Dayjs>) => {
  return (
    <Stack>
      <InputLabel shrink={false} htmlFor={`picker-${label}`}>
        <Typography variant="caption">{label}</Typography>
      </InputLabel>
      <DatePicker
        minDate={min}
        maxDate={max}
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
