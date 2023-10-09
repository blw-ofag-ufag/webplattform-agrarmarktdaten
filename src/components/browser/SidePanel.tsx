import { IcControlDownload, IcControlExternal, IcFilter } from "@/icons/icons-jsx/control";
import useEvent from "@/lib/use-event";
import { Trans, plural, t } from "@lingui/macro";
import {
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Box,
  Button,
  Chip,
  ChipProps,
  Grow,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { PropsWithChildren, SyntheticEvent, useMemo, useState } from "react";
import { makeStyles, withStyles } from "../style-utils";
import FilterAccordion from "../filter-accordion";
import MultiCheckboxAutocomplete from "./MultiCheckboxAutocomplete";
import { useAtom } from "jotai";
import {
  CheckboxValue,
  addedValueValuesAtom,
  countriesAtom,
  indicatorsAtom,
  marketsAtom,
  monthsAtom,
  productionSystemsAtom,
  productsAtom,
  yearAtom,
} from "@/domain/data";
import MultiCheckbox from "./MultiCheckbox";

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
        <CountriesAccordion {...getAccordionProps("countries")} />
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
            <Trans id="data.action.query">SPARQLE query</Trans>
          </Typography>
        </SidePanelButton>
      </Stack>
    </Stack>
  );
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
  const [values, setValues] = useAtom(indicatorsAtom);
  const selected = useMemo(() => values.find((x) => x.value), [values]);

  return (
    <FilterAccordion {...props}>
      <AccordionSummary>
        <AccordionTitle>Indicators</AccordionTitle>
        <Grow in={!props.expanded && !!selected}>
          <Typography variant="body2" color="grey.500" mr={1}>
            {selected && selected.label}
          </Typography>
        </Grow>
      </AccordionSummary>
      <AccordionDetails>
        <MultiCheckbox radio values={values} onChange={setValues} />
      </AccordionDetails>
    </FilterAccordion>
  );
};

const FilterSlider = withStyles(Slider, (theme) => ({
  root: {
    marginBottom: theme.spacing(6),
    "& .MuiSlider-valueLabel": {
      top: "3.25rem",
      padding: "2px 4px",
      backgroundColor: theme.palette.grey[300],
      color: theme.palette.text.primary,
      fontSize: "0.75rem",
      "&:before": {
        bottom: "auto",
        top: "-8px",
      },
    },
  },
}));

const MonthChip = (props: ChipProps) => {
  return (
    <Chip
      {...props}
      sx={{
        minWidth: "auto",
        height: 22,
        "& .MuiChip-label": {
          padding: 0,
          textTransform: "uppercase",
          fontWeight: "600",
          color: "grey.700",
        },
        "&.MuiChip-colorPrimary": {
          backgroundColor: "grey.500",
        },
      }}
    />
  );
};

const TimeAccordion = (props: Omit<AccordionProps, "children">) => {
  const [yearOptions, setYearOptions] = useAtom(yearAtom);
  const [yearSliderValue, setYearSliderValue] = useState(() => [1990, new Date().getFullYear()]);
  const handleYearSlideChangeCommitted = useEvent((ev, value: number[] | number) => {
    if (!Array.isArray(value)) {
      return;
    }
    setYearOptions({
      ...yearOptions,
      value: value as [number, number],
    });
  });
  const handleYearSlideChange = useEvent((ev, value: number[] | number) => {
    if (!Array.isArray(value)) {
      return;
    }
    setYearSliderValue(value as [number, number]);
  });
  const [monthOptions, setMonthOptions] = useAtom(monthsAtom);
  const trueMonths = useMemo(() => monthOptions.filter((m) => m.value), [monthOptions]);
  const handleToggleMonth = useEvent((i: number) => {
    if (trueMonths.length === monthOptions.length) {
      setMonthOptions(monthOptions.map((m, j) => ({ ...m, value: i === j ? true : false })));
    } else {
      setMonthOptions([
        ...monthOptions.slice(0, i),
        {
          ...monthOptions[i],
          value: !monthOptions[i].value,
        },
        ...monthOptions.slice(i + 1),
      ]);
    }
  });
  return (
    <FilterAccordion {...props}>
      <AccordionSummary>
        <AccordionTitle>Time</AccordionTitle>
      </AccordionSummary>
      <AccordionDetails>
        <AccordionTitle>Year</AccordionTitle>
        <FilterSlider
          disableSwap
          min={yearOptions.min}
          max={yearOptions.max}
          step={1}
          value={yearSliderValue}
          valueLabelDisplay="on"
          onChange={handleYearSlideChange}
          onChangeCommitted={handleYearSlideChangeCommitted}
        />
        <AccordionTitle>Month</AccordionTitle>
        <Box
          display="grid"
          sx={{
            gridTemplateColumns: "repeat(auto-fit, minmax(60px, 1fr))",
            gridGap: "0.25rem",
          }}
        >
          {monthOptions.map((m, i) => (
            <MonthChip
              key={m.name}
              label={m.label}
              onClick={() => handleToggleMonth(i)}
              color={m.value && trueMonths.length !== monthOptions.length ? "primary" : undefined}
            />
          ))}
        </Box>
      </AccordionDetails>
    </FilterAccordion>
  );
};

const FilterPreviewMultiCheckbox = ({
  show = true,
  selected,
  options,
}: {
  show?: boolean;
  selected: CheckboxValue[];
  options: CheckboxValue[];
}) => {
  return (
    <Grow in={show}>
      <Typography variant="body2" color="grey.500" mr={1}>
        {selected.length === 0 && <Trans id="data.filters.none">None</Trans>}
        {selected.length === options.length && <Trans id="data.filters.all">All</Trans>}
        {selected.length > 0 &&
          selected.length < options.length &&
          selected[0].label + (selected.length > 1 ? " +" + (selected.length - 1) : "")}
      </Typography>
    </Grow>
  );
};

const MarketsAccordion = (props: Omit<AccordionProps, "children">) => {
  const [values, setValues] = useAtom(marketsAtom);
  const selected = useMemo(() => values.filter((x) => x.value), [values]);

  return (
    <FilterAccordion {...props}>
      <AccordionSummary>
        <AccordionTitle>Markets</AccordionTitle>
        <FilterPreviewMultiCheckbox show={!props.expanded} selected={selected} options={values} />
        <CountTrue show={!props.expanded} values={values} />
      </AccordionSummary>
      <AccordionDetails>
        <MultiCheckbox values={values} onChange={setValues} />
      </AccordionDetails>
    </FilterAccordion>
  );
};

const AddedValueAccordion = (props: Omit<AccordionProps, "children">) => {
  const [values, setValues] = useAtom(addedValueValuesAtom);
  const selected = useMemo(() => values.filter((x) => x.value), [values]);

  return (
    <FilterAccordion {...props}>
      <AccordionSummary>
        <AccordionTitle>Added value</AccordionTitle>
        <FilterPreviewMultiCheckbox show={!props.expanded} selected={selected} options={values} />
      </AccordionSummary>
      <AccordionDetails>
        <MultiCheckbox values={values} onChange={setValues} />
      </AccordionDetails>
    </FilterAccordion>
  );
};

const ProductionSystemsAccordion = (props: Omit<AccordionProps, "children">) => {
  const [values, setValues] = useAtom(productionSystemsAtom);
  const selected = useMemo(() => values.filter((x) => x.value), [values]);

  return (
    <FilterAccordion {...props}>
      <AccordionSummary>
        <AccordionTitle>Production systems</AccordionTitle>
        <FilterPreviewMultiCheckbox show={!props.expanded} selected={selected} options={values} />
      </AccordionSummary>
      <AccordionDetails>
        <MultiCheckbox values={values} onChange={setValues} />
      </AccordionDetails>
    </FilterAccordion>
  );
};

const CountriesAccordion = (props: Omit<AccordionProps, "children">) => {
  const [values, setValues] = useAtom(countriesAtom);
  return (
    <FilterAccordion {...props}>
      <AccordionSummary>
        <AccordionTitle>Countries</AccordionTitle>
        <CountTrue values={values} show={!props.expanded} />
      </AccordionSummary>
      <AccordionDetails>
        <MultiCheckboxAutocomplete
          values={values}
          onChange={setValues}
          placeholder="Choose countries"
        />
      </AccordionDetails>
    </FilterAccordion>
  );
};

const ProductsAccordion = (props: Omit<AccordionProps, "children">) => {
  const [values, setValues] = useAtom(productsAtom);
  return (
    <FilterAccordion {...props}>
      <AccordionSummary>
        <AccordionTitle>Products</AccordionTitle>
        <CountTrue values={values} show={!props.expanded} />
      </AccordionSummary>
      <AccordionDetails sx={{ mx: "-2px" }}>
        <MultiCheckboxAutocomplete
          values={values}
          onChange={setValues}
          groupBy={(x) => x.group}
          placeholder="Choose products"
        />
      </AccordionDetails>
    </FilterAccordion>
  );
};

const CountTrue = ({ values, show }: { values: CheckboxValue[]; show: boolean }) => {
  const trueValues = useMemo(() => values.filter((x) => x.value), [values]);
  return trueValues.length === values.length || trueValues.length === 0 ? null : (
    <Grow in={show}>
      <Chip sx={{ color: "grey.700" }} size="small" label={trueValues.length} />
    </Grow>
  );
};

export default SidePanel;
