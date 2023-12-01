import { availableBaseDimensionsValuesAtom, cubeDimensionsStatusAtom } from "@/domain/cubes";
import {
  Option,
  filterCubeConfigurationAtom,
  filterCubeSelectionAtom,
  filterDimensionsConfigurationAtom,
  filterDimensionsSelectionAtom,
  resetCubeFiltersAtom,
  timeRangeAtom,
  timeRangeDefault,
  timeViewAtom,
} from "@/domain/filters";
import { observationsQueryAtom } from "@/domain/observations";
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
} from "@mui/material";
import dayjs from "dayjs";
import { Atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { maxBy, minBy, xor } from "lodash";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import FilterAccordion from "../filter-accordion";
import { withStyles } from "../style-utils";
import { ContentDrawer, ContentDrawerProps } from "./ContentDrawer";
import PreviewFilter from "./filters/PreviewFilter";
import RadioFilter from "./filters/RadioFilter";
import Select, { PreviewSelect, SelectProps } from "./filters/SelectFilter";
import TimeFilter, { previewTime } from "./filters/TimeFilter";

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

const orderedCubeFilters = ["value-chain", /* "market", */ "measure"] as const;
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
  const filterCubeConfiguration = useAtomValue(filterCubeConfigurationAtom);
  const filterDimensionsConfiguration = useAtomValue(filterDimensionsConfigurationAtom);
  const filterCubeSelection = useAtomValue(filterCubeSelectionAtom);
  const filterDimensionsSelection = useAtomValue(filterDimensionsSelectionAtom);
  const availableBaseDimensionsValues = useAtomValue(availableBaseDimensionsValuesAtom);
  const filtersChangedCount = useAtomValue(resetCubeFiltersAtom);
  const cubeDimensionsStatus = useAtomValue(cubeDimensionsStatusAtom);

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
            <Stack direction="row" gap={0.5} alignItems="center">
              {cubeDimensionsStatus.isSuccess && filtersChangedCount > 0 && <ResetFiltersButton />}
              <IconButton onClick={onClose}>
                <IcChevronDoubleLeft />
              </IconButton>
            </Stack>
          </Box>
          {/* Cube path filters */}
          {orderedCubeFilters.map((key) => {
            const config = filterCubeConfiguration[key];
            const filterAtom = filterCubeSelection[key];

            if (!config) {
              return null;
            }

            const options = config.options.filter((option) => {
              return availableBaseDimensionsValues[key].options.includes(option.value);
            });

            if (!filterAtom) {
              return null;
            }

            return (
              <FilterRadioAccordion
                key={key}
                slots={{
                  accordion: getAccordionProps(key),
                }}
                options={options}
                filterAtom={filterAtom}
                title={config.name}
                defaultValue={config.defaultOption}
              />
            );
          })}
          <TimeAccordion {...getAccordionProps("time")} />

          {/* Property filters */}

          {cubeDimensionsStatus.isSuccess ? (
            <>
              {Object.entries(filterDimensionsConfiguration).map(([key, value]) => {
                const filterAtom =
                  filterDimensionsSelection[key as keyof typeof filterDimensionsConfiguration];
                if (!filterAtom) {
                  return null;
                }
                return (
                  <FilterSelectAccordion
                    key={key}
                    slots={{
                      accordion: getAccordionProps(key),
                      select: {
                        withSearch: value.search,
                        groups: value?.groups,
                      },
                    }}
                    options={value.options}
                    filterAtom={filterAtom}
                    title={value.name ?? value.key}
                  />
                );
              })}
            </>
          ) : (
            <AccordionSummary>
              <CircularProgress />
            </AccordionSummary>
          )}
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
}: {
  filterAtom: Atom<T | undefined>;
  options: T[];
  title: string;
  slots: {
    accordion: Omit<AccordionProps, "children">;
  };
  defaultValue: T;
}) => {
  const [value, setValue] = useAtom(filterAtom);
  const isTainted = value?.value !== defaultValue.value;

  return (
    <FilterAccordion {...slots.accordion}>
      <AccordionSummary className={isTainted ? "tainted" : ""}>
        <AccordionTitle>{title}</AccordionTitle>
        <PreviewFilter tainted={isTainted} show={!slots.accordion.expanded && !!value}>
          {value && value.label}
        </PreviewFilter>
      </AccordionSummary>
      <AccordionDetails>
        <RadioFilter value={value} onChange={setValue} options={options} />
      </AccordionDetails>
    </FilterAccordion>
  );
};

const AccordionSummary = withStyles(AccordionSummaryMui, (theme) => ({
  root: {
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
  filterAtom: Atom<T[]>;
  options: T[];
  title: string;
  slots: {
    accordion: Omit<AccordionProps, "children">;
    select: Omit<SelectProps<T>, "values" | "onChange" | "options">;
  };
}) => {
  const [values, setValues] = useAtom(filterAtom);
  const isTainted = useMemo(() => {
    return (
      xor(
        values.map((v) => v.value),
        options.map((o) => o.value)
      ).length > 0
    );
  }, [values, options]);

  return (
    <FilterAccordion {...slots.accordion}>
      <AccordionSummary className={isTainted ? "tainted" : ""}>
        <AccordionTitle>{title}</AccordionTitle>
        <PreviewSelect
          tainted={isTainted}
          show={!slots.accordion.expanded}
          values={values}
          options={options}
        />
      </AccordionSummary>
      <AccordionDetails>
        <Select values={values} onChange={setValues} options={options} {...slots.select} />
      </AccordionDetails>
    </FilterAccordion>
  );
};

const TimeAccordion = (props: Omit<AccordionProps, "children">) => {
  const [timeRange, setTimeRange] = useAtom(timeRangeAtom);
  const [timeView, setTimeView] = useAtom(timeViewAtom);
  const observationsQuery = useAtomValue(observationsQueryAtom);

  useEffect(() => {
    if (observationsQuery.data) {
      const minDate = minBy(observationsQuery.data.observations, (d) => dayjs(d.date))?.date;
      const maxDate = maxBy(observationsQuery.data.observations, (d) => dayjs(d.date))?.date;

      const min = minDate ? dayjs(minDate).unix() : timeRangeDefault.min;
      const max = maxDate ? dayjs(maxDate).unix() : timeRangeDefault.max;
      setTimeRange({
        value: [min, max],
        min,
        max,
      });
    }
  }, [observationsQuery.data, setTimeRange]);

  const handleTimeRangeChange = useEvent((value: [number, number]) => {
    if (!Array.isArray(value)) {
      return;
    }
    setTimeRange({
      ...timeRange,
      value: value as [number, number],
    });
  });

  const isTainted = useMemo(() => {
    return (
      timeRange.value[0] !== timeRange.min ||
      timeRange.value[1] !== timeRange.max ||
      timeView !== "Year"
    );
  }, [timeRange, timeView]);

  return (
    <FilterAccordion {...props}>
      <AccordionSummary className={isTainted ? "tainted" : ""}>
        <AccordionTitle>
          <Trans id="data.filters.time">Time</Trans>
        </AccordionTitle>
        <PreviewFilter show={!props.expanded}>
          {previewTime(timeRange.value[0], timeRange.value[1], timeView)}
        </PreviewFilter>
      </AccordionSummary>
      <AccordionDetails>
        <TimeFilter
          min={timeRange.min}
          max={timeRange.max}
          value={timeRange.value}
          view={timeView}
          onChangeRange={handleTimeRangeChange}
          onChangeView={setTimeView}
        />
      </AccordionDetails>
    </FilterAccordion>
  );
};

export default SidePanel;

export const ResetFiltersButton = () => {
  const resetCubeFilters = useSetAtom(resetCubeFiltersAtom);
  return (
    <Chip
      clickable
      onClick={() => resetCubeFilters()}
      label={t({ id: "cta.reset-filters", message: "Reset Filters" })}
      icon={<IcRepeat width={24} height={24} />}
      sx={{
        backgroundColor: "cobalt.100",
        color: "grey.800",
        "&:hover": {
          backgroundColor: "cobalt.100",
        },
      }}
    />
  );
};
