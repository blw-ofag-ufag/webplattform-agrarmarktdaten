import { Property } from "@/domain/data";
import {
  Option,
  filterAtom,
  filtersValuesHashAtomsAtom,
  indicatorAtom,
  indicators,
  timeRangeAtom,
  timeViewAtom,
} from "@/domain/filters";
import useEvent from "@/lib/use-event";
import { Trans } from "@lingui/macro";
import {
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { Atom, useAtom, useAtomValue } from "jotai";
import { SyntheticEvent, useState } from "react";
import FilterAccordion from "../filter-accordion";
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

const SidePanel = () => {
  const { getAccordionProps } = useExclusiveAccordion("accordion");
  const filters = useAtomValue(filterAtom);
  const filtersValuesHashAtoms = useAtomValue(filtersValuesHashAtomsAtom);

  return (
    <Stack
      justifyContent="space-between"
      sx={{
        height: "100%",
      }}
    >
      <Box>
        <Box
          sx={{
            px: "16px",
            py: "36px",
          }}
          display="flex"
          justifyContent="space-between"
        >
          <Stack direction="row" gap={0.5} alignItems="center">
            <Typography variant="h4">
              <Trans id="data.filters.heading">Filters</Trans>
            </Typography>
          </Stack>
        </Box>
        <IndicatorAccordion {...getAccordionProps("indicator")} />
        <TimeAccordion {...getAccordionProps("time")} />

        {/* Property filters */}
        {Object.entries(filters).map(([key, value]) => {
          const filterAtom = filtersValuesHashAtoms[key as Property];
          if (!filterAtom) {
            return null;
          }
          return (
            <FilterSelectAccordion
              key={key}
              slots={{
                accordion: getAccordionProps(key),
                select: {
                  withSearch: value.config.search,
                  options: value.options,
                },
              }}
              options={value.options}
              filterAtom={filterAtom}
              title={value.name}
            />
          );
        })}
      </Box>
    </Stack>
  );
};

const AccordionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography variant="h5" fontWeight="bold" color="grey.800">
      {children}
    </Typography>
  );
};

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
    select: Omit<SelectProps<T>, "values" | "onChange">;
  };
}) => {
  const [values, setValues] = useAtom(filterAtom);

  return (
    <FilterAccordion {...slots.accordion}>
      <AccordionSummary>
        <AccordionTitle>{title}</AccordionTitle>
        <PreviewSelect show={!slots.accordion.expanded} values={values} options={options} />
      </AccordionSummary>
      <AccordionDetails>
        <Select values={values} onChange={setValues} {...slots.select} />
      </AccordionDetails>
    </FilterAccordion>
  );
};
const IndicatorAccordion = (props: Omit<AccordionProps, "children">) => {
  const [value, setValue] = useAtom(indicatorAtom);

  return (
    <FilterAccordion {...props}>
      <AccordionSummary>
        <AccordionTitle>
          <Trans id="data.filters.indicator">Indicator</Trans>
        </AccordionTitle>
        <PreviewFilter show={!props.expanded && !!value}>{value && value.label}</PreviewFilter>
      </AccordionSummary>
      <AccordionDetails>
        <RadioFilter value={value} onChange={setValue} options={indicators} />
      </AccordionDetails>
    </FilterAccordion>
  );
};

const TimeAccordion = (props: Omit<AccordionProps, "children">) => {
  const [timeRange, setTimeRange] = useAtom(timeRangeAtom);
  const [timeView, setTimeView] = useAtom(timeViewAtom);

  const handleTimeRangeChange = useEvent((value: [number, number]) => {
    if (!Array.isArray(value)) {
      return;
    }
    setTimeRange({
      ...timeRange,
      value: value as [number, number],
    });
  });

  return (
    <FilterAccordion {...props}>
      <AccordionSummary>
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
