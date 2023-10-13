import { getMarketColor } from "@/domain/colors";
import {
  addedValueValues,
  addedValueValuesAtom,
  indicatorAtom,
  indicators,
  markets,
  marketsAtom,
  productionSystems,
  productionSystemsAtom,
  products,
  productsAtom,
  salesRegions,
  salesRegionsAtom,
  timeRangeAtom,
  timeViewAtom,
  Option,
} from "@/domain/data";
import { IcControlDownload, IcControlExternal, IcFilter } from "@/icons/icons-jsx/control";
import useEvent from "@/lib/use-event";
import { Trans, plural, t } from "@lingui/macro";
import {
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { Atom, useAtom } from "jotai";
import { PropsWithChildren, SyntheticEvent, useState } from "react";
import FilterAccordion from "../filter-accordion";
import { makeStyles } from "../style-utils";
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

const useSidePanelStyles = makeStyles()((theme) => ({
  inverted: {
    backgroundColor: theme.palette.grey[700],
    color: theme.palette.grey[50],
    "&:hover": {
      backgroundColor: theme.palette.grey[800],
    },
  },
}));

const SidePanel = () => {
  const { getAccordionProps } = useExclusiveAccordion("accordion");

  const resultCount = 0; // @TODO: placeholder
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
            <IcFilter width={24} height={24} />
            <Typography variant="h4">
              <Trans id="data.filters.heading">Filters</Trans>
            </Typography>
          </Stack>

          <Typography variant="body2" color="grey.600">
            {`${resultCount} ${t({
              id: "data.filters.results",
              message: plural(resultCount, { one: "result", other: "results" }),
            })}`}
          </Typography>
        </Box>
        <FilterSelectAccordion
          slots={{
            accordion: getAccordionProps("markets"),
            select: {
              options: markets,
            },
          }}
          filterAtom={marketsAtom}
          title={t({ id: "data.filters.markets", message: "Markets" })}
        />
        <FilterSelectAccordion
          slots={{
            accordion: getAccordionProps("addedvalue"),
            select: {
              options: addedValueValues,
            },
          }}
          filterAtom={addedValueValuesAtom}
          title={t({ id: "data.filters.addedValue", message: "Added Value" })}
        />
        <IndicatorAccordion {...getAccordionProps("indicator")} />
        <TimeAccordion {...getAccordionProps("time")} />
        <FilterSelectAccordion
          slots={{
            accordion: getAccordionProps("products"),
            select: {
              withSearch: true,
              options: products,
              groups: [(d) => d.market, (d) => d.group, (d) => d.subgroup],
              colorCheckbox: (d) => getMarketColor(d.marketSlug)[1],
            },
          }}
          filterAtom={productsAtom}
          title={t({ id: "data.filters.products", message: "Products" })}
        />
        <FilterSelectAccordion
          slots={{
            accordion: getAccordionProps("productionsystems"),
            select: {
              options: productionSystems,
            },
          }}
          filterAtom={productionSystemsAtom}
          title={t({ id: "data.filters.productionSystems", message: "Production Systems" })}
        />
        <FilterSelectAccordion
          slots={{
            accordion: getAccordionProps("salesRegions"),
            select: {
              options: salesRegions,
            },
          }}
          filterAtom={salesRegionsAtom}
          title={t({ id: "data.filters.salesRegions", message: "Sales Regions" })}
        />
      </Box>
      <Stack direction="column">
        <SidePanelButton inverted>
          <IcControlDownload width={24} height={24} />
          <Typography variant="h5">
            <Trans id="data.action.download">Download data</Trans>
          </Typography>
        </SidePanelButton>
        <SidePanelButton>
          <IcControlExternal width={24} height={24} />
          <Typography variant="h5">
            <Trans id="data.action.query">SPARQL query</Trans>
          </Typography>
        </SidePanelButton>
      </Stack>
    </Stack>
  );
};

const SidePanelButton = ({
  inverted = false,
  children,
}: { inverted?: boolean } & PropsWithChildren) => {
  const { classes, cx } = useSidePanelStyles();
  return (
    <Button variant="aside" className={cx({ [classes.inverted]: inverted })}>
      <Stack direction="row" gap={1} alignItems="center">
        {children}
      </Stack>
    </Button>
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
}: {
  filterAtom: Atom<T[]>;
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
        <PreviewSelect show={!slots.accordion.expanded} values={values} options={markets} />
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
