import { TimeView } from "@/domain/filters";
import { IcControlCalendar, IcControlChevronUp } from "@/icons/icons-jsx/control";
import { useLocale } from "@/lib/use-locale";
import { Trans, t } from "@lingui/macro";
import {
  Box,
  Button,
  Divider,
  InputLabel,
  Slider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  sliderClasses,
} from "@mui/material";
import {
  DatePicker,
  DatePickerProps,
  LocalizationProvider,
  dateCalendarClasses,
  pickersCalendarHeaderClasses,
  pickersMonthClasses,
  pickersYearClasses,
  yearCalendarClasses,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/de";
import "dayjs/locale/fr";
import "dayjs/locale/it";
import { useEffect, useMemo, useState } from "react";
import { makeStyles } from "../../style-utils";

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

const formatTimeView = (view: TimeView) => (view === "Year" ? "YYYY" : "MM.YYYY");

export default function TimeFilter({
  min,
  max,
  value,
  view,
  onChangeRange = () => {},
  onChangeView = () => {},
  onReset = () => {},
  resettable,
}: {
  min: number;
  max: number;
  value: [number, number];
  view: TimeView;
  onChangeRange?: (newValues: [number, number]) => void;
  onChangeView?: (newGranularity: TimeView) => void;
  onReset?: () => void;
  resettable?: boolean;
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
      current = current.add(1, view === "Year" ? "year" : "month");
      if (!current.isSame(maxDate)) {
        values.push(getMark(current));
      }
    }

    values.push(getMark(maxDate, true));

    return values;
  }, [minDate, maxDate, view, timeFormat]);

  return (
    <Stack gap={3}>
      <Box minHeight={28}>
        {resettable && (
          <Button
            variant="text"
            size="small"
            sx={{
              width: "fit-content",
            }}
            onClick={onReset}
          >
            <Trans id="data.control.reset">Reset</Trans>
          </Button>
        )}
      </Box>
      <ToggleButtonGroup
        size="small"
        fullWidth
        value={view}
        exclusive
        onChange={(_, value) => {
          if (value) {
            onChangeView(value);
          }
        }}
      >
        <ToggleButton value="Year">
          <Trans id="data.filters.year">Year</Trans>
        </ToggleButton>
        <ToggleButton value="Month">
          <Trans id="data.filters.month">Month</Trans>
        </ToggleButton>
      </ToggleButtonGroup>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
        <Stack direction="row" spacing={3} alignItems="end">
          <DatePickerField
            min={minDate}
            max={maxDate}
            label={t({ id: "data.filters.from", message: "From" })}
            views={view === "Year" ? ["year"] : ["year", "month"]}
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
            views={view === "Year" ? ["year"] : ["year", "month"]}
            format={timeFormat}
            value={dayjs.unix(value[1])}
            onChange={(date) => {
              if (date) onChangeRange([value[0], date.unix()]);
            }}
          />
        </Stack>
        <Box px={2}>
          <Slider
            value={sliderRange}
            min={min}
            max={max}
            step={null}
            size="small"
            marks={sliderValues}
            valueLabelDisplay="auto"
            valueLabelFormat={(v) => dayjs.unix(v).format(timeFormat)}
            disableSwap
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
        </Box>
      </LocalizationProvider>
    </Stack>
  );
}

export const previewTime = (min: number, max: number, view: TimeView) => {
  return `${dayjs.unix(min).format(formatTimeView(view))} - ${dayjs
    .unix(max)
    .format(formatTimeView(view))}`;
};

const useDatePickerStyles = makeStyles()((theme) => {
  return {
    layout: {
      [`& .${pickersCalendarHeaderClasses.root}`]: {
        paddingLeft: theme.spacing(3),
        fontWeight: "bold",
        borderBottom: "1px solid",
        borderColor: theme.palette.cobalt[100],
        paddingBottom: theme.spacing(2),
      },
      [`& .${dateCalendarClasses.root}`]: {
        height: "212px",
        maxHeight: "212px",
        overflow: "scroll",
      },
      [`& .${yearCalendarClasses.root}`]: {
        maxHeight: "none",
        px: theme.spacing(2),
      },
      [`& .${pickersMonthClasses.root}`]: {
        flexBasis: "25%",
      },

      [`& .${pickersYearClasses.yearButton}`]: {
        borderRadius: theme.spacing(1),
        [`&.${pickersYearClasses.selected}`]: {
          color: "white",
          ":focus": {
            backgroundColor: theme.palette.cobalt[500],
          },
        },
      },
      [`& .${pickersMonthClasses.monthButton}`]: {
        mx: 0,
        my: theme.spacing(1),
        borderRadius: theme.spacing(1),
        [`&.${pickersMonthClasses.selected}`]: {
          color: "white",
          ":focus": {
            backgroundColor: theme.palette.cobalt[500],
          },
        },
      },
    },
  };
});

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
  const { classes } = useDatePickerStyles();
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
        {...props}
        slotProps={{
          calendarHeader: {
            slots: {
              switchViewIcon: IcControlChevronUp,
            },
          },
          layout: {
            className: classes.layout,
          },
          textField: {
            size: "small",
            id: "picker-from",
            InputLabelProps: {
              shrink: true,
            },
          },
          ...props.slotProps,
        }}
      />
    </Stack>
  );
};
