import { availableBaseDimensionsValuesAtom, cubeDimensionsStatusAtom } from "@/domain/cubes";
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
} from "@mui/material";
import { WritableAtom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { xor } from "lodash";
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
  const cubeDimensionsStatus = useAtomValue(cubeDimensionsStatusAtom);
  const filters = useAtomValue(filterAtom);
  const isMobile = useIsMobile();

  const measureAtom = filters.cube.dimensions.measure.atom;
  const [_, setMeasure] = useAtom(measureAtom);

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
              {cubeDimensionsStatus.isSuccess && filters.changed > 0 && <ResetFiltersButton />}
              {isMobile ? (
                <IconButton onClick={onClose}>
                  <IcChevronDoubleLeft />
                </IconButton>
              ) : null}
            </Stack>
          </Box>
          {/* Cube path filters */}
          {sidePanelFiltersOrder.map((filterSpec) => {
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

              const handleMarketChange = () => {
                setMeasure(DEFAULT_MEASURE);
              };

              return (
                <>
                  {filters.cube.isLoading && (
                    <FilterAccordion key={key} {...getAccordionProps(key)}>
                      <AccordionSummary>
                        <CircularProgress />
                      </AccordionSummary>
                    </FilterAccordion>
                  )}
                  {filters.cube.isSuccess && (
                    <FilterRadioAccordion
                      key={key}
                      slots={{
                        accordion: getAccordionProps(key),
                      }}
                      options={options}
                      filterAtom={config.atom}
                      onChange={key === "market" ? handleMarketChange : undefined}
                      title={config.name ?? key}
                      defaultValue={config.default}
                    />
                  )}
                </>
              );
            } else if (type === "dimension") {
              const config = filters.dimensions.dimensions[key];

              if (filters.cube.isError) {
                return null;
              }

              return (
                <>
                  {filters.dimensions.isLoading && (
                    <FilterAccordion key={key} {...getAccordionProps(key)}>
                      <AccordionSummary>
                        <CircularProgress />
                      </AccordionSummary>
                    </FilterAccordion>
                  )}
                  {filters.dimensions.isSuccess && (
                    <FilterSelectAccordion
                      key={key}
                      slots={{
                        accordion: getAccordionProps(key),
                        select: {
                          withSearch: config.search,
                          groups: config?.groups,
                        },
                      }}
                      options={config.options}
                      filterAtom={config.atom}
                      title={config.name}
                    />
                  )}
                </>
              );
            } else if (type === "time") {
              return <TimeAccordion key={key} {...getAccordionProps("time")} />;
            } else {
              throw new Error("not implemented");
            }
          })}
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
  onChange?: () => void;
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
            onChange?.();
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
