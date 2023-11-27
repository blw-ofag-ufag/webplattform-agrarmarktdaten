import { availableBaseDimensionsValuesAtom } from "@/domain/cubes";
import {
  Option,
  filterConfigurationAtom,
  filterCubeSelectionAtom,
  filterDimensionsSelectionAtom,
  resetCubeFiltersAtom,
  timeRangeAtom,
  timeViewAtom,
} from "@/domain/filters";
import { IcChevronDoubleLeft, IcRepeat } from "@/icons/icons-jsx/control";
import useEvent from "@/lib/use-event";
import { Trans, t } from "@lingui/macro";
import {
  AccordionDetails,
  AccordionProps,
  AccordionSummary as AccordionSummaryMui,
  Box,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { xor } from "lodash";
import { SyntheticEvent, useMemo, useState } from "react";
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
  const filterConfiguration = useAtomValue(filterConfigurationAtom);
  const filterCubeSelection = useAtomValue(filterCubeSelectionAtom);
  const filterDimensionsSelection = useAtomValue(filterDimensionsSelectionAtom);
  const availableBaseDimensionsValues = useAtomValue(availableBaseDimensionsValuesAtom);
  const filtersChangedCount = useAtomValue(resetCubeFiltersAtom);

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
            <Typography variant="h4">
              <Trans id="data.filters.heading">Filters</Trans>
            </Typography>
            <Stack direction="row" gap={0.5} alignItems="center">
              {filtersChangedCount > 0 && <ResetFiltersButton />}
              <IconButton onClick={onClose}>
                <IcChevronDoubleLeft />
              </IconButton>
            </Stack>
          </Box>
          {/* Cube path filters */}
          {orderedCubeFilters.map((key) => {
            const config = filterConfiguration.cube[key];
            const filterAtom = filterCubeSelection[key];

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

          {Object.entries(filterConfiguration.dimensions).map(([key, value]) => {
            const filterAtom =
              filterDimensionsSelection[key as keyof (typeof filterConfiguration)["dimensions"]];
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
