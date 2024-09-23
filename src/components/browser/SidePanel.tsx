import { availableBaseDimensionsValuesAtom, availableMeasuresPerMarketAtom } from "@/domain/cubes";
import { DEFAULT_MEASURE, DEFAULT_TIME_VIEW, Option, TimeView, filterAtom } from "@/domain/filters";
import { IcChevronDoubleLeft, IcRepeat } from "@/icons/icons-jsx/control";
import useEvent from "@/lib/use-event";
import { Trans, t } from "@lingui/macro";
import {
  AccordionDetails,
  AccordionProps,
  AccordionSummary as AccordionSummaryMui,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
  accordionSummaryClasses,
  Button,
} from "@mui/material";
import { WritableAtom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { SyntheticEvent, useMemo, useState } from "react";
import FilterAccordion from "../FilterAccordion";
import { withStyles } from "../style-utils";
import { ContentDrawer, ContentDrawerProps } from "./ContentDrawer";
import PreviewFilter from "./filters/PreviewFilter";
import RadioFilter from "./filters/RadioFilter";
import SelectFilter, { PreviewSelect, SelectFilterProps } from "./filters/SelectFilter";
import TimeFilter, { previewTime } from "./filters/TimeFilter";
import dayjs from "dayjs";
import { useIsMobile } from "@/components/Grid/Grid";
import { sidePanelFiltersOrder } from "@/domain/dimensions";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { makeStyles } from "../style-utils";
import React from "react";

const useExclusiveAccordion = (defaultState: string) => {
  const [expanded, setExpanded] = useState<string | undefined>(defaultState);
  const onChange = useEvent((ev: SyntheticEvent<Element>) => {
    const name = (ev.currentTarget.parentNode as HTMLElement).dataset["name"];
    setExpanded((expanded) => (expanded === name ? undefined : name));
  });
  const getAccordionProps = (key: string) => {
    return {
      expanded: expanded === key,
      onChange,
      "data-name": key,
    };
  };
  return { getAccordionProps };
};

const SidePanel = ({
  open = true,
  onClose = () => {},
  slots,
}: {
  open?: boolean;
  onClose?: () => void;
  slots: {
    drawer: Omit<ContentDrawerProps, "open">;
  };
}) => {
  const { getAccordionProps } = useExclusiveAccordion("accordion");
  const availableBaseDimensionsValues = useAtomValue(availableBaseDimensionsValuesAtom);
  const filters = useAtomValue(filterAtom);
  const isMobile = useIsMobile();
  const [showMore, setShowMore] = useState(true);
  const { classes } = useStyles();

  const measureAtom = filters.cube.dimensions.measure.atom;
  const [currentMeasure, setMeasure] = useAtom(measureAtom);

  const [availableMeasuresPerMarket] = useAtom(availableMeasuresPerMarketAtom);

  const filtersToDisplay = useMemo(() => {
    return showMore ? sidePanelFiltersOrder.slice(0, 6) : sidePanelFiltersOrder;
  }, [showMore]);

  return (
    <ContentDrawer anchor="left" open={open} onClose={onClose} {...slots?.drawer}>
      <Stack
        justifyContent="space-between"
        sx={{
          height: "100%",
        }}
      >
        <Box>
          <Box
            sx={{
              px: 4,
              py: 6,
            }}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h2">
              <Trans id="data.filters.heading">Filters</Trans>
            </Typography>
            <Stack direction="row" gap={1} alignItems="center">
              {isMobile ? (
                <IconButton onClick={onClose}>
                  <IcChevronDoubleLeft />
                </IconButton>
              ) : null}
            </Stack>
          </Box>
          {/* Cube path filters */}
          {filtersToDisplay.map((filterSpec) => {
            const { key, type } = filterSpec;
            if (type === "cube") {
              if (filters.cube.isError) {
                return null;
              }
              const config = filters.cube.dimensions[key];

              const options = config.options.map((option) => {
                const disabled =
                  key === "market"
                    ? false
                    : !availableBaseDimensionsValues[key].options.includes(option.value);
                return {
                  ...option,
                  disabled,
                };
              });

              const sortedOptions = orderNA(options);

              const handleMarketChange = (market: string) => {
                if (currentMeasure) {
                  const marketAvailableMeasures = availableMeasuresPerMarket[market];

                  if (!marketAvailableMeasures.includes(currentMeasure)) {
                    setMeasure(marketAvailableMeasures[0]);
                  }
                } else {
                  setMeasure(DEFAULT_MEASURE);
                }
              };

              return (
                <React.Fragment key={key}>
                  {filters.cube.isLoading && (
                    <FilterAccordion key={key} {...getAccordionProps(key)}>
                      <AccordionSummary>
                        <CircularProgress />
                      </AccordionSummary>
                    </FilterAccordion>
                  )}
                  {filters.cube.isSuccess && options.length > 1 && (
                    <FilterRadioAccordion
                      key={key}
                      slots={{
                        accordion: getAccordionProps(key),
                      }}
                      options={sortedOptions}
                      filterAtom={config.atom}
                      onChange={key === "market" ? handleMarketChange : undefined}
                      title={config.name ?? key}
                      defaultValue={config.default}
                    />
                  )}
                </React.Fragment>
              );
            } else if (type === "dimension") {
              const config = filters.dimensions.dimensions[key];

              if (filters.cube.isError) {
                return null;
              }

              const sortedOptions = orderNA(config.options);

              return (
                <React.Fragment key={key}>
                  {filters.dimensions.isLoading && (
                    <FilterAccordion key={key} {...getAccordionProps(key)}>
                      <AccordionSummary>
                        <CircularProgress />
                      </AccordionSummary>
                    </FilterAccordion>
                  )}
                  {filters.dimensions.isSuccess && config.options.length > 1 && (
                    <FilterSelectAccordion
                      key={key}
                      slots={{
                        accordion: getAccordionProps(key),
                        select: {
                          withSearch: config.search,
                          groups: config?.groups,
                        },
                      }}
                      options={sortedOptions}
                      filterAtom={config.atom}
                      title={config.name}
                    />
                  )}
                </React.Fragment>
              );
            } else if (type === "time") {
              return <TimeAccordion key={key} {...getAccordionProps("time")} />;
            } else {
              throw new Error("not implemented");
            }
          })}

          <Box className={classes.toggleArea}>
            <Button
              variant="outlined"
              className={classes.toggleBtn}
              color="info"
              startIcon={showMore ? <AddIcon /> : <RemoveIcon />}
              onClick={() => setShowMore((x) => !x)}
            >
              {showMore ? (
                <Trans id="data.filters.more">More Filters</Trans>
              ) : (
                <Trans id="data.filters.less">Less Filters</Trans>
              )}
            </Button>
          </Box>
        </Box>
      </Stack>
    </ContentDrawer>
  );
};

const AccordionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography variant="h5" fontWeight="bold" color="grey.800">
      {children}
    </Typography>
  );
};

const FilterRadioAccordion = <T extends Option>({
  filterAtom,
  title,
  slots,
  options,
  defaultValue,
  onChange,
}: {
  filterAtom: WritableAtom<string | undefined, any, void>;
  options: T[];
  title: string;
  slots: {
    accordion: Omit<AccordionProps, "children">;
  };
  defaultValue: string;
  onChange?: (value: string) => void;
}) => {
  const [value, setValue] = useAtom(filterAtom);
  const isTainted = value !== defaultValue;

  const optionValue = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);

  return (
    <FilterAccordion {...slots.accordion}>
      <AccordionSummary className={isTainted ? "tainted" : ""}>
        <AccordionTitle>{title}</AccordionTitle>
        <PreviewFilter tainted={isTainted} show={!!value}>
          {optionValue && optionValue.label}
        </PreviewFilter>
      </AccordionSummary>
      <AccordionDetails>
        <RadioFilter
          value={optionValue}
          onChange={(option) => {
            setValue(option.value);
            onChange?.(option.value);
          }}
          options={options}
        />
      </AccordionDetails>
    </FilterAccordion>
  );
};

const AccordionSummary = withStyles(AccordionSummaryMui, (theme) => ({
  root: {
    [`& .${accordionSummaryClasses.content}`]: {
      gap: "1rem",
    },
    "&.tainted": {
      color: theme.palette.grey[500],
      backgroundColor: theme.palette.cobalt[100],
    },
  },
}));

const FilterSelectAccordion = <T extends Option>({
  filterAtom,
  title,
  slots,
  options,
}: {
  filterAtom: WritableAtom<string[], any, void>;
  options: T[];
  title: string;
  slots: {
    accordion: Omit<AccordionProps, "children">;
    select: Omit<SelectFilterProps<T>, "values" | "onChange" | "options">;
  };
}) => {
  const [values, setValues] = useAtom(filterAtom);
  const isTainted = useMemo(() => {
    return (
      xor(
        values,
        options.map((o) => o.value)
      ).length > 0
    );
  }, [values, options]);

  const valuesOptions = useMemo(() => {
    return options.filter((option) => values.includes(option.value));
  }, [values, options]);

  return (
    <FilterAccordion {...slots.accordion}>
      <AccordionSummary className={isTainted ? "tainted" : ""}>
        <AccordionTitle>{title}</AccordionTitle>
        <PreviewSelect tainted={isTainted} values={valuesOptions} options={options} />
      </AccordionSummary>
      <AccordionDetails>
        <SelectFilter
          values={valuesOptions}
          onChange={(options) => setValues(options.map((o) => o.value))}
          options={options}
          {...slots.select}
        />
      </AccordionDetails>
    </FilterAccordion>
  );
};

const TimeAccordion = (props: Omit<AccordionProps, "children">) => {
  const filters = useAtomValue(filterAtom);
  const [timeRange, setTimeRange] = useAtom(filters.dimensions.time.range.atom);
  const [timeView, setTimeView] = useAtom(filters.cube.time.view.atom);

  const handleTimeRangeChange = useEvent((value: [number, number]) => {
    if (!Array.isArray(value)) {
      return;
    }

    setTimeRange(value as [number, number]);
  });

  const handleTimeViewChange = useEvent((value: TimeView) => {
    setTimeView(value);
    if (value === "Month") {
      const endOfYear = dayjs.unix(timeRange[1]).endOf("year").unix();
      const rangeEnd =
        endOfYear > filters.dimensions.time.range.dataRange[1]
          ? filters.dimensions.time.range.dataRange[1]
          : endOfYear;
      setTimeRange([timeRange[0], rangeEnd]);
    }
  });

  const handleReset = useEvent(() => {
    setTimeRange(filters.dimensions.time.range.dataRange);
    setTimeView(DEFAULT_TIME_VIEW);
  });

  const isTainted = filters.cube.time.view.isChanged || filters.dimensions.time.range.isChanged;

  const timeDomain = useMemo(() => {
    return [
      Math.max(timeRange[0], filters.dimensions.time.range.dataRange[0]),
      Math.min(timeRange[1], filters.dimensions.time.range.dataRange[1]),
    ] as [number, number];
  }, [timeRange, filters.dimensions.time.range.dataRange]);

  return (
    <>
      {filters.dimensions.isLoading ||
        (filters.cube.isLoading && (
          <FilterAccordion {...props}>
            <AccordionSummary>
              <CircularProgress />
            </AccordionSummary>
          </FilterAccordion>
        ))}
      {filters.dimensions.isSuccess && filters.cube.isSuccess && (
        <FilterAccordion {...props}>
          <AccordionSummary className={isTainted ? "tainted" : ""}>
            <AccordionTitle>
              <Trans id="data.filters.time">Time</Trans>
            </AccordionTitle>
            <PreviewFilter tainted={isTainted}>
              {previewTime(timeDomain[0], timeDomain[1], timeView)}
            </PreviewFilter>
          </AccordionSummary>
          <AccordionDetails>
            <TimeFilter
              min={filters.dimensions.time.range.dataRange[0]}
              max={filters.dimensions.time.range.dataRange[1]}
              value={timeDomain}
              view={timeView}
              onChangeRange={handleTimeRangeChange}
              onChangeView={handleTimeViewChange}
              resettable={isTainted}
              onReset={handleReset}
            />
          </AccordionDetails>
        </FilterAccordion>
      )}
    </>
  );
};

export default SidePanel;

export const ResetFiltersButton = () => {
  const dispatchFilters = useSetAtom(filterAtom);
  return (
    <Chip
      clickable
      onClick={() => dispatchFilters({ action: "reset" })}
      label={t({ id: "cta.reset-filters", message: "Reset Filters" })}
      icon={<IcRepeat width={24} height={24} />}
      sx={{
        backgroundColor: "cobalt.100",
        color: "grey.800",
        border: "1px solid",
        borderColor: "cobalt.100",
        transition: "border 0.2s ease-in-out",
        "&:hover, &:active, &:focus": {
          backgroundColor: "cobalt.100",
          borderColor: "cobalt.800",
        },
      }}
    />
  );
};

const useStyles = makeStyles()(({ spacing: s, palette }) => ({
  toggleArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: s(5),
  },
  toggleBtn: {
    width: "fit-content",
    borderRadius: 2,
    color: palette.cobalt[500],
    borderColor: palette.cobalt[500],
    paddingInline: s(4),
    "&:hover": {
      backgroundColor: "rgba(70, 89, 107, 0.04)",
    },
  },
}));

function orderNA(
  items:
    | {
        label: string;
        value: string;
      }[]
    | Option<string>[]
) {
  const nonNA = items.filter((i) => i.label !== "NA");
  return [...nonNA, ...items.filter((i) => i.label === "NA")];
}

function xor(values: string[], arg1: string[]) {
  const set = new Set([...values, ...arg1]);
  return Array.from(set).filter((value) => values.includes(value) !== arg1.includes(value));
}
