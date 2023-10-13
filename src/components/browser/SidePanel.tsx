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
import { useAtom } from "jotai";
import { PropsWithChildren, SyntheticEvent, useState } from "react";
import FilterAccordion from "../filter-accordion";
import { makeStyles } from "../style-utils";
import PreviewFilter from "./filters/PreviewFilter";
import RadioFilter from "./filters/RadioFilter";
import Select, { PreviewSelect } from "./filters/SelectFilter";
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
        <IndicatorAccordion {...getAccordionProps("indicator")} />
        <MarketsAccordion {...getAccordionProps("markets")} />
        <TimeAccordion {...getAccordionProps("time")} />
        <AddedValueAccordion {...getAccordionProps("addedvalue")} />
        <ProductionSystemsAccordion {...getAccordionProps("productionsystems")} />
        <ProductsAccordion {...getAccordionProps("products")} />
        <SalesRegionsAccordion {...getAccordionProps("salesRegions")} />
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

const MarketsAccordion = (props: Omit<AccordionProps, "children">) => {
  const [values, setValues] = useAtom(marketsAtom);

  return (
    <FilterAccordion {...props}>
      <AccordionSummary>
        <AccordionTitle>
          <Trans id="data.filters.markets">Markets</Trans>
        </AccordionTitle>
        <PreviewSelect show={!props.expanded} values={values} options={markets} />
      </AccordionSummary>
      <AccordionDetails>
        <Select options={markets} values={values} onChange={setValues} />
      </AccordionDetails>
    </FilterAccordion>
  );
};

const AddedValueAccordion = (props: Omit<AccordionProps, "children">) => {
  const [values, setValues] = useAtom(addedValueValuesAtom);

  return (
    <FilterAccordion {...props}>
      <AccordionSummary>
        <AccordionTitle>
          <Trans id="data.filters.addedValue">Added Value</Trans>
        </AccordionTitle>
        <PreviewSelect show={!props.expanded} values={values} options={addedValueValues} />
      </AccordionSummary>
      <AccordionDetails>
        <Select options={addedValueValues} values={values} onChange={setValues} />
      </AccordionDetails>
    </FilterAccordion>
  );
};

const ProductionSystemsAccordion = (props: Omit<AccordionProps, "children">) => {
  const [values, setValues] = useAtom(productionSystemsAtom);
  return (
    <FilterAccordion {...props}>
      <AccordionSummary>
        <AccordionTitle>
          <Trans id="data.filters.productionSystems">Production Systems</Trans>
        </AccordionTitle>
        <PreviewSelect show={!props.expanded} values={values} options={productionSystems} />
      </AccordionSummary>
      <AccordionDetails>
        <Select options={productionSystems} values={values} onChange={setValues} />
      </AccordionDetails>
    </FilterAccordion>
  );
};

const SalesRegionsAccordion = (props: Omit<AccordionProps, "children">) => {
  const [values, setValues] = useAtom(salesRegionsAtom);
  return (
    <FilterAccordion {...props}>
      <AccordionSummary>
        <AccordionTitle>
          <Trans id="data.filters.salesRegions">Sales Region</Trans>
        </AccordionTitle>
        <PreviewSelect show={!props.expanded} values={values} options={salesRegions} />
      </AccordionSummary>
      <AccordionDetails>
        <Select options={salesRegions} values={values} onChange={setValues} />
      </AccordionDetails>
    </FilterAccordion>
  );
};

const ProductsAccordion = (props: Omit<AccordionProps, "children">) => {
  const [values, setValues] = useAtom(productsAtom);
  return (
    <FilterAccordion {...props}>
      <AccordionSummary>
        <AccordionTitle>
          <Trans id="data.filters.products">Products</Trans>
        </AccordionTitle>
        <PreviewSelect show={!props.expanded} values={values} options={products} />
      </AccordionSummary>
      <AccordionDetails>
        <Select
          withSearch
          options={products}
          groups={[(d) => d.market, (d) => d.group, (d) => d.subgroup]}
          values={values}
          onChange={setValues}
          colorCheckbox={(d) => getMarketColor(d.marketSlug)[1]}
        />
      </AccordionDetails>
    </FilterAccordion>
  );
};

export default SidePanel;
