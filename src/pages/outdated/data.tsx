import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Autocomplete,
  AutocompleteProps,
  Box,
  Checkbox,
  Chip,
  ChipProps,
  createTheme,
  FormControlLabel,
  Grow,
  Paper,
  Radio,
  Slider,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { PrimitiveAtom, useAtom, useSetAtom } from "jotai";
import React, { SyntheticEvent, useMemo, useState } from "react";

import DebugQuery from "@/components/debug-query";
import FilterAccordion from "@/components/filter-accordion";
import { AppLayout } from "@/components/layout";
import { withStyles } from "@/components/style-utils";
import {
  addedValueValuesAtom,
  CheckboxValue,
  countriesAtom,
  indicatorsAtom,
  marketsAtom,
  monthsAtom,
  productionSystemsAtom,
  productsAtom,
  yearAtom,
} from "@/domain/data";
import {
  AgDataDimension,
  agDataDimensions,
  Cube,
  Dimension,
  Observation,
  ObservationIri,
  queryDateExtent,
  queryDimensions,
  queryObservationIris,
  queryObservations,
  queryPossibleCubes,
} from "@/lib/cube-queries";
import useEvent from "@/lib/use-event";
import { useLocale } from "@/lib/use-locale";
import blwTheme from "@/theme/blw";

import useSparql, { SparqlQueryResult } from "../api/use-sparql";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const blackAndWhiteTheme = createTheme(blwTheme, {
  palette: {
    primary: {
      main: "#444",
    },
    secondary: {
      main: "#888",
    },
  },
});

const renderCheckbox = ({ value }: { value: CheckboxValue }) => (
  <Checkbox value={value.value} checked={value.value || false} />
);
const renderRadio = ({ value }: { value: CheckboxValue }) => (
  <Radio sx={{ mt: "-6px" }} size="small" checked={value.value || false} />
);

const MultiCheckbox = <T extends CheckboxValue>({
  values,
  onChange,
  radio,
}: {
  values: T[];
  onChange: (v: T[]) => void;
  radio?: boolean;
}) => {
  const handleChange = (i: number, value: boolean) => {
    let newValues;
    if (radio) {
      newValues = values.map((v, j) => ({ ...v, value: i === j }));
    } else {
      newValues = [...values.slice(0, i), { ...values[i], value }, ...values.slice(i + 1)];
    }
    onChange(newValues);
  };
  const control = radio ? renderRadio : renderCheckbox;

  return (
    <>
      {values.map((value, i) => (
        <FormControlLabel
          key={value.name}
          disableTypography
          sx={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            "& .MuiTypography-root": {
              position: "relative",
              top: 2,
            },
          }}
          label={<Typography variant="body2">{value.label}</Typography>}
          name={value.name}
          control={control({ value })}
          onChange={(_, checked: boolean) => {
            handleChange(i, checked);
          }}
        />
      ))}
    </>
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

const AccordionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography variant="overline" fontWeight="bold" color="grey.600">
      {children}
    </Typography>
  );
};

const IndicatorAccordion = (props: Omit<AccordionProps, "children">) => {
  const [values, setValues] = useAtom(indicatorsAtom);
  return (
    <FilterAccordion {...props}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <AccordionTitle>Indicators</AccordionTitle>
        <CountTrue show={!props.expanded} values={values} />
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
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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

const MarketsAccordion = (props: Omit<AccordionProps, "children">) => {
  const [values, setValues] = useAtom(marketsAtom);
  return (
    <FilterAccordion {...props}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <AccordionTitle>Markets</AccordionTitle>
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
  return (
    <FilterAccordion {...props}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <AccordionTitle>Added value</AccordionTitle>
        <CountTrue show={!props.expanded} values={values} />
      </AccordionSummary>
      <AccordionDetails>
        <MultiCheckbox values={values} onChange={setValues} />
      </AccordionDetails>
    </FilterAccordion>
  );
};

const ProductionSystemsAccordion = (props: Omit<AccordionProps, "children">) => {
  const [values, setValues] = useAtom(productionSystemsAtom);
  return (
    <FilterAccordion {...props}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <AccordionTitle>Production systems</AccordionTitle>
        <CountTrue values={values} show={!props.expanded} />
      </AccordionSummary>
      <AccordionDetails>
        <MultiCheckbox values={values} onChange={setValues} />
      </AccordionDetails>
    </FilterAccordion>
  );
};

const StyledTextField = styled(TextField)({
  "& input": {
    minWidth: "100% !important",
  },
});

const MultiCheckboxAutocomplete = <T extends CheckboxValue>({
  values,
  onChange,
  placeholder,
  groupBy,
}: {
  values: T[];
  onChange: (newValues: T[]) => void;
  placeholder: string;
  groupBy?: (item: T) => string;
}) => {
  const selected = useMemo(() => {
    return values.filter((x) => x.value);
  }, [values]);

  const handleChange: AutocompleteProps<T, true, false, false>["onChange"] = (_, value) => {
    const selectedByName = new Set(value.map((s) => s.name));
    const newValues = values.map((v) => ({
      ...v,
      value: selectedByName.has(v.name),
    }));
    onChange(newValues);
  };

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      value={selected}
      options={values}
      disableCloseOnSelect
      onChange={handleChange}
      sx={{
        "& .MuiOutlinedInput-root .MuiAutocomplete-endAdornment": {
          top: "7px",
        },
      }}
      disableClearable
      getOptionLabel={(option) => option.label}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
          {option.label}
        </li>
      )}
      style={{ width: "100%" }}
      ChipProps={{ size: "small" }}
      groupBy={groupBy}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          placeholder={placeholder}
          size="small"
          sx={{ display: "block", minWidth: "100% !important" }}
        />
      )}
    />
  );
};

const CountriesAccordion = (props: Omit<AccordionProps, "children">) => {
  const [values, setValues] = useAtom(countriesAtom);
  return (
    <FilterAccordion {...props}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <AccordionTitle>Countries</AccordionTitle>
        <CountTrue values={values} show={!props.expanded} />
      </AccordionSummary>
      <AccordionDetails>
        <MultiCheckboxAutocomplete values={values} onChange={setValues} placeholder="Choose countries" />
      </AccordionDetails>
    </FilterAccordion>
  );
};

const ProductsAccordion = (props: Omit<AccordionProps, "children">) => {
  const [values, setValues] = useAtom(productsAtom);
  return (
    <FilterAccordion {...props}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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

const MenuContent = () => {
  const { getAccordionProps } = useExclusiveAccordion("accordion");
  return (
    <>
      <IndicatorAccordion {...getAccordionProps("indicator")} />
      <MarketsAccordion {...getAccordionProps("markets")} />
      <TimeAccordion {...getAccordionProps("time")} />
      <AddedValueAccordion {...getAccordionProps("addedvalue")} />
      <ProductionSystemsAccordion {...getAccordionProps("productionsystems")} />
      <ProductsAccordion {...getAccordionProps("products")} />
      <CountriesAccordion {...getAccordionProps("countries")} />
    </>
  );
};

const StateChip = <T extends CheckboxValue>({ label, atom }: { label: string; atom: PrimitiveAtom<T[]> }) => {
  const [values, setValues] = useAtom(atom);
  const trueValues = useMemo(() => values.filter((x) => x.value), [values]);
  if (values.length === trueValues.length || trueValues.length === 0) {
    return null;
  }
  return (
    <Grow in>
      <Chip
        onDelete={() => {
          setValues(values.map((x) => ({ ...x, value: false })));
        }}
        title={trueValues.map((x) => x.label).join(", ")}
        label={
          <>
            {label}:{" "}
            {trueValues
              .slice(0, 3)
              .map((x) => x.label)
              .join(", ")}
            {trueValues.length > 2 ? "..." : null}
          </>
        }
      />
    </Grow>
  );
};

const TimeStateChip = () => {
  const [months, setMonths] = useAtom(monthsAtom);
  const [yearRange, setYearRange] = useAtom(yearAtom);
  const trueMonths = useMemo(() => months.filter((v) => v.value), [months]);

  const handleDelete = useEvent(() => {
    setYearRange({ ...yearRange, value: [yearRange.min, yearRange.max] });
    setMonths(months.map((x) => ({ ...x, value: true })));
  });

  const displayMonths = trueMonths.length !== months.length && trueMonths.length !== 0;
  const displayYears = yearRange.value[0] !== yearRange.min || yearRange.value[1] !== yearRange.max;

  if (!displayMonths && !displayYears) {
    return null;
  }

  return (
    <Grow in>
      <Chip
        onDelete={handleDelete}
        label={
          <>
            Time: {displayMonths ? trueMonths.map((x) => x.name).join(", ") : null}
            {displayMonths && displayYears ? ", " : null}
            {displayYears ? `${yearRange.value[0]}-${yearRange.value[1]}` : null}
          </>
        }
      />
    </Grow>
  );
};
const useCurrentIndicator = () => {
  const [indicators] = useAtom(indicatorsAtom);
  const indicator = indicators.find((x) => x.value);
  return indicator;
};

const useFilters = () => {
  const [years] = useAtom(yearAtom);
  return {
    years,
  };
};

const Results = ({
  cubesQuery,
  dimensionsQuery,
  yearsQuery,
}: {
  cubesQuery: SparqlQueryResult<Cube[]>;
  dimensionsQuery: SparqlQueryResult<Dimension[]>;
  yearsQuery: SparqlQueryResult<{ min: string; max: string }[]>;
}) => {
  const locale = useLocale();
  const indicator = useCurrentIndicator();
  const { data: cubes } = cubesQuery;
  const { data: dimensions, fetching: fetchingDimensions } = dimensionsQuery;
  const filters = useFilters();
  const observationIrisQuery = useSparql<ObservationIri[]>({
    query: queryObservationIris(cubes, filters),
    enabled: !fetchingDimensions,
  });
  const { data: observationIris, fetching: fetchingObservationIris } = observationIrisQuery;
  const observationsQuery = useSparql<Observation[]>({
    query: queryObservations(cubes?.length!, observationIris!, dimensions, indicator?.dimensionIri!, locale),
    enabled: !fetchingObservationIris,
  });
  const { data: observations, fetching: fetchingObservations } = observationsQuery;

  const dimensionsToRender: AgDataDimension[] | undefined = useMemo(
    () => dimensions?.map((d) => agDataDimensions[d.dimension]).filter(Boolean),
    [dimensions]
  );

  return (
    <Box m={4} overflow="hidden">
      <Paper sx={{ maxHeight: 500, overflow: "auto", mb: 2 }}>
        {fetchingObservations ? null : (
          <Table>
            <TableHead>
              <TableRow>
                {dimensionsToRender?.map((d) => <TableCell key={d.iri}>{d.name}</TableCell>)}
                {/*
               TODO: Do we even need this indicator here? It is needed to select
               the cubes for merging, but at this point we probably should just add
               measures to the agDataDimensions object and generate this automatically.
               */}
                <TableCell>{indicator?.label}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {observations?.map((o, i) => (
                <TableRow key={i}>
                  {dimensionsToRender?.map((d, j) => (
                    <TableCell key={`${i}_${j}`}>{o[d.name as keyof Observation]}</TableCell>
                  ))}
                  <TableCell>{o.measure}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
      <Box>
        <DebugQuery
          name="cubes"
          query={cubesQuery}
          renderData={(cubes) => cubes.map((cube) => <div key={cube.cube}>{cube.cube}</div>)}
        />
        <DebugQuery
          name="dimensions"
          query={dimensionsQuery}
          renderData={(dims) =>
            dims.map((dim) => (
              <div key={dim.dimension}>
                {dim.dimension}: {dim.count}
              </div>
            ))
          }
        />
        <DebugQuery name="observationIris" query={observationIrisQuery} renderData />
        <DebugQuery name="years" query={yearsQuery} renderData />
        <DebugQuery name="observations" query={observationsQuery} />
      </Box>
    </Box>
  );
};

const SafeHydrate = ({ children }: { children: React.ReactElement }) => {
  return typeof window === "undefined" ? null : children;
};

export default function DataBrowser() {
  const indicator = useCurrentIndicator();
  const setYearsAtom = useSetAtom(yearAtom);
  const [markets] = useAtom(marketsAtom);

  const cubesQuery = useSparql<Cube[]>({
    query: queryPossibleCubes({
      indicator: indicator?.dimensionIri!,
      markets: markets.filter((m) => m.value).map((m) => m.name),
    }),
    enabled: !!indicator?.dimensionIri,
  });
  const dimensionsQuery = useSparql<Dimension[]>({
    query: queryDimensions(cubesQuery.data),
    enabled: !!(cubesQuery?.data && cubesQuery.data.length > 0),
  });
  const yearsQuery = useSparql<{ min: string; max: string }[]>({
    query: queryDateExtent(cubesQuery.data),
    enabled: !!(dimensionsQuery?.data && dimensionsQuery.data.length > 0),
    onSuccess: (data) => {
      if (data.length === 0) {
        return;
      }
      const { min, max } = data[0];
      const minYear = parseInt(min.slice(0, 4));
      const maxYear = parseInt(max.slice(0, 4));
      setYearsAtom({
        min: minYear,
        max: maxYear,
        value: [minYear, maxYear],
      });
    },
  });

  return (
    <SafeHydrate>
      <ThemeProvider theme={blackAndWhiteTheme}>
        <AppLayout>
          <Box mb={-8} zIndex={0} display="flex" justifyContent="stretch" minHeight="80vh">
            <Box width="236px" flexGrow={0} flexShrink={0}>
              <MenuContent />
            </Box>
            <Box bgcolor="#eee" flexGrow={1} overflow="hidden">
              <Box display="flex" flexWrap="wrap" sx={{ gap: 1 }} m={4}>
                <StateChip label="Indicators" atom={indicatorsAtom} />
                <TimeStateChip />
                <StateChip label="Markets" atom={marketsAtom} />
                <StateChip label="Added value" atom={addedValueValuesAtom} />
                <StateChip label="Products" atom={productsAtom} />
                <StateChip label="Production systems" atom={productionSystemsAtom} />
                <StateChip label="Countries" atom={countriesAtom} />
              </Box>
              {/* <DataBrowserDebug /> */}
              <Results cubesQuery={cubesQuery} dimensionsQuery={dimensionsQuery} yearsQuery={yearsQuery} />
            </Box>
          </Box>
        </AppLayout>
      </ThemeProvider>
    </SafeHydrate>
  );
}
