import { availableBaseDimensionsValuesAtom, cubeDimensionsStatusAtom } from "@/domain/cubes";
import { DEFAULT_TIME_VIEW, Option, filterAtom } from "@/domain/filters";
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
const orderedDimensionFilters = ["sales-region", "product"] as const;

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
              {cubeDimensionsStatus.isSuccess && filters.changed > 0 && <ResetFiltersButton />}
              <IconButton onClick={onClose}>
                <IcChevronDoubleLeft />
              </IconButton>
            </Stack>
          </Box>
          {/* Cube path filters */}
          {orderedCubeFilters.map((key) => {
            if (filters.cube.isError) {
              return null;
            }
            const config = filters.cube.dimensions[key];

            const options = config.options.map((option) => {
              return {
                ...option,
                disabled: !availableBaseDimensionsValues[key].options.includes(option.value),
              };
            });

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
                    title={config.name ?? key}
                    defaultValue={config.default}
                  />
                )}
              </>
            );
          })}

          <TimeAccordion {...getAccordionProps("time")} />

          {/* Property filters */}

          {orderedDimensionFilters.map((key) => {
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
  defaultValue: string;
}) => {
  const [value, setValue] = useAtom(filterAtom);
  const isTainted = value?.value !== defaultValue;

  return (
    <FilterAccordion {...slots.accordion}>
      <AccordionSummary className={isTainted ? "tainted" : ""}>
        <AccordionTitle>{title}</AccordionTitle>
        <PreviewFilter tainted={isTainted} show={!!value}>
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
        <PreviewSelect tainted={isTainted} values={values} options={options} />
      </AccordionSummary>
      <AccordionDetails>
        <Select values={values} onChange={setValues} options={options} {...slots.select} />
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

  const handleReset = useEvent(() => {
    setTimeRange(filters.dimensions.time.range.dataRange);
    setTimeView(DEFAULT_TIME_VIEW);
  });

  const isTainted = filters.cube.time.view.isChanged || filters.dimensions.time.range.isChanged;

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
              {previewTime(timeRange[0], timeRange[1], timeView)}
            </PreviewFilter>
          </AccordionSummary>
          <AccordionDetails>
            <TimeFilter
              min={filters.dimensions.time.range.dataRange[0]}
              max={filters.dimensions.time.range.dataRange[1]}
              value={timeRange}
              view={timeView}
              onChangeRange={handleTimeRangeChange}
              onChangeView={setTimeView}
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
