import { ExpandMore } from "@material-ui/icons";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Box,
  Checkbox,
  Chip,
  createTheme,
  FormControlLabel,
  Slider,
  ThemeProvider,
  Typography,
  AccordionDetailsProps,
  Grow,
  ChipProps,
  SliderProps,
  Autocomplete,
  TextField,
  styled,
  Radio,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
} from "@mui/material";
import { useAtom, WritableAtom } from "jotai";
import React, { SyntheticEvent, useMemo, useState } from "react";

import DebugQuery from "@/components/debug-query";
import { AppLayout } from "@/components/layout";
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
  Cube,
  Observation,
  queryDateExtent,
  queryPossibleCubes,
  queryObservations,
  Dimension,
  agDataDimensions,
  AgDataDimension,
  queryDimensions,
  ObservationIri,
  queryObservationIris,
} from "@/lib/cube-queries";
import useEvent from "@/lib/use-event";
import { useLocale } from "@/lib/use-locale";
import theme from "@/theme";

import useSparql, { SparqlQueryResult } from "./api/use-sparql";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const blackAndWhiteTheme = createTheme(theme, {
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
      newValues = [
        ...values.slice(0, i),
        { ...values[i], value },
        ...values.slice(i + 1),
      ];
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

const FilterAccordionSummary = ({ ...props }) => {
  return (
    <AccordionSummary
      {...props}
      expandIcon={<ExpandMore />}
      sx={{
        paddingTop: "6px",
        paddingBottom: "6px",
        paddingLeft: "1rem",
        "&.Mui-expanded": {
          minHeight: "48px",
          paddingTop: "6px",
          paddingBottom: "6px",
        },
        "& .MuiAccordionSummary-content": {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 0,
          ".Mui-expanded &": {
            margin: 0,
          },
        },
      }}
    />
  );
};

const FilterAccordionDetails = (props: AccordionDetailsProps) => {
  return (
    <AccordionDetails
      {...props}
      sx={{
        display: "flex",
        flexDirection: "column",
        mx: "4px",
        mt: "-8px",
        px: "1rem",
        pb: 5,
        ...props.sx,
      }}
    />
  );
};

const FilterAccordion = (props: AccordionProps) => {
  return (
    <Accordion
      {...props}
      sx={{
        paddingBottom: 1,
        "&.Mui-expanded": {
          marginTop: 0,
          marginBottom: 0,
          "&::before": {
            opacity: 1,
          },
        },
      }}
    />
  );
};

const CountTrue = ({
  values,
  show,
}: {
  values: CheckboxValue[];
  show: boolean;
}) => {
  const trueValues = useMemo(() => values.filter((x) => x.value), [values]);
  return trueValues.length === values.length ||
    trueValues.length === 0 ? null : (
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
      <FilterAccordionSummary>
        <AccordionTitle>Indicators</AccordionTitle>
        <CountTrue show={!props.expanded} values={values} />
      </FilterAccordionSummary>
      <FilterAccordionDetails>
        <MultiCheckbox radio values={values} onChange={setValues} />
      </FilterAccordionDetails>
    </FilterAccordion>
  );
};

const FilterSlider = (props: SliderProps) => {
  return (
    <Slider
      {...props}
      sx={{
        "& .MuiSlider-markLabel": {
          fontSize: "0.75rem",
        },
      }}
    />
  );
};

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
  const handleYearSlideChange = useEvent((ev, value: number[] | number) => {
    if (!Array.isArray(value)) {
      return;
    }
    setYearOptions({
      ...yearOptions,
      value: value as [number, number],
    });
  });
  const [monthOptions, setMonthOptions] = useAtom(monthsAtom);
  const trueMonths = useMemo(
    () => monthOptions.filter((m) => m.value),
    [monthOptions]
  );
  const handleToggleMonth = useEvent((i: number) => {
    if (trueMonths.length === monthOptions.length) {
      setMonthOptions(
        monthOptions.map((m, j) => ({ ...m, value: i === j ? true : false }))
      );
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
      <FilterAccordionSummary>
        <AccordionTitle>Time</AccordionTitle>
      </FilterAccordionSummary>
      <FilterAccordionDetails>
        <AccordionTitle>Year</AccordionTitle>
        <FilterSlider
          disableSwap
          min={yearOptions.min}
          max={yearOptions.max}
          marks={[
            { value: yearOptions.min, label: yearOptions.min },
            { value: yearOptions.max, label: yearOptions.max },
          ]}
          valueLabelDisplay="auto"
          step={1}
          value={yearOptions.value}
          onChange={handleYearSlideChange}
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
              color={
                m.value && trueMonths.length !== monthOptions.length
                  ? "primary"
                  : undefined
              }
            />
          ))}
        </Box>
      </FilterAccordionDetails>
    </FilterAccordion>
  );
};

const MarketsAccordion = (props: Omit<AccordionProps, "children">) => {
  const [values, setValues] = useAtom(marketsAtom);
  return (
    <FilterAccordion {...props}>
      <FilterAccordionSummary>
        <AccordionTitle>Markets</AccordionTitle>
        <CountTrue show={!props.expanded} values={values} />
      </FilterAccordionSummary>
      <FilterAccordionDetails>
        <MultiCheckbox values={values} onChange={setValues} />
      </FilterAccordionDetails>
    </FilterAccordion>
  );
};

const AddedValueAccordion = (props: Omit<AccordionProps, "children">) => {
  const [values, setValues] = useAtom(addedValueValuesAtom);
  return (
    <FilterAccordion {...props}>
      <FilterAccordionSummary>
        <AccordionTitle>Added value</AccordionTitle>
        <CountTrue show={!props.expanded} values={values} />
      </FilterAccordionSummary>
      <FilterAccordionDetails>
        <MultiCheckbox values={values} onChange={setValues} />
      </FilterAccordionDetails>
    </FilterAccordion>
  );
};

const ProductionSystemsAccordion = (
  props: Omit<AccordionProps, "children">
) => {
  const [values, setValues] = useAtom(productionSystemsAtom);
  return (
    <FilterAccordion {...props}>
      <FilterAccordionSummary>
        <AccordionTitle>Production systems</AccordionTitle>
        <CountTrue values={values} show={!props.expanded} />
      </FilterAccordionSummary>
      <FilterAccordionDetails>
        <MultiCheckbox values={values} onChange={setValues} />
      </FilterAccordionDetails>
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
  const handleChange = useEvent((_, selectedValues: T[], _2) => {
    const selectedByName = new Set(selectedValues.map((s) => s.name));
    const newValues = values.map((v) => ({
      ...v,
      value: selectedByName.has(v.name),
    }));
    onChange(newValues);
  });
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
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
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
      <FilterAccordionSummary>
        <AccordionTitle>Countries</AccordionTitle>
        <CountTrue values={values} show={!props.expanded} />
      </FilterAccordionSummary>
      <FilterAccordionDetails sx={{ mx: "-2px" }}>
        <MultiCheckboxAutocomplete
          values={values}
          onChange={setValues}
          placeholder="Choose countries"
        />
      </FilterAccordionDetails>
    </FilterAccordion>
  );
};

const ProductsAccordion = (props: Omit<AccordionProps, "children">) => {
  const [values, setValues] = useAtom(productsAtom);
  return (
    <FilterAccordion {...props}>
      <FilterAccordionSummary>
        <AccordionTitle>Products</AccordionTitle>
        <CountTrue values={values} show={!props.expanded} />
      </FilterAccordionSummary>
      <FilterAccordionDetails sx={{ mx: "-2px" }}>
        <MultiCheckboxAutocomplete
          values={values}
          onChange={setValues}
          groupBy={(x) => x.group}
          placeholder="Choose products"
        />
      </FilterAccordionDetails>
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

const StateChip = <T extends CheckboxValue>({
  label,
  atom,
}: {
  label: string;
  atom: WritableAtom<T[], T[]>;
}) => {
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

  const displayMonths =
    trueMonths.length !== months.length && trueMonths.length !== 0;
  const displayYears =
    yearRange.value[0] !== yearRange.min ||
    yearRange.value[1] !== yearRange.max;

  if (!displayMonths && !displayYears) {
    return null;
  }

  return (
    <Grow in>
      <Chip
        onDelete={handleDelete}
        label={
          <>
            Time:{" "}
            {displayMonths ? trueMonths.map((x) => x.name).join(", ") : null}
            {displayMonths && displayYears ? ", " : null}
            {displayYears
              ? `${yearRange.value[0]}-${yearRange.value[1]}`
              : null}
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
  const { data: observationIris, fetching: fetchingObservationIris } =
    observationIrisQuery;
  const observationsQuery = useSparql<Observation[]>({
    query: queryObservations(
      cubes?.length!,
      observationIris!,
      dimensions,
      indicator?.dimensionIri!,
      locale
    ),
    enabled: !fetchingObservationIris,
  });
  const { data: observations, fetching: fetchingObservations } =
    observationsQuery;

  const dimensionsToRender: AgDataDimension[] | undefined = useMemo(
    () => dimensions?.map((d) => agDataDimensions[d.dimension]).filter(Boolean),
    [dimensions]
  );

  return (
    <Box m={4} overflow="hidden">
      <Box mb={4}>
        <DebugQuery name="cubes" query={cubesQuery} showData />
        <DebugQuery name="dimensions" query={dimensionsQuery} showData />
        <DebugQuery
          name="observationIris"
          query={observationIrisQuery}
          showData
        />
        <DebugQuery name="years" query={yearsQuery} showData />
        <DebugQuery name="observations" query={observationsQuery} />
      </Box>
      {fetchingObservations ? null : (
        <Table>
          <TableHead>
            <TableRow>
              {dimensionsToRender?.map((d) => (
                <TableCell key={d.iri}>{d.name}</TableCell>
              ))}
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
                  <TableCell key={`${i}_${j}`}>
                    {o[d.name as keyof Observation]}
                  </TableCell>
                ))}
                <TableCell>{o.measure}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

const SafeHydrate = ({ children }: { children: React.ReactElement }) => {
  return typeof window === "undefined" ? null : children;
};

export default function DataBrowser() {
  const indicator = useCurrentIndicator();
  const [years, setYearsAtom] = useAtom(yearAtom);
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
          <Box
            mt="92px"
            py={4}
            mb={-8}
            zIndex={0}
            display="flex"
            justifyContent="stretch"
            minHeight="80vh"
          >
            <Box width="236px" flexGrow={0} flexShrink={0}>
              <MenuContent />
            </Box>
            <Box bgcolor="#eee" flexGrow={1}>
              <Box display="flex" flexWrap="wrap" sx={{ gap: 1 }} m={4}>
                <StateChip label="Indicators" atom={indicatorsAtom} />
                <TimeStateChip />
                <StateChip label="Markets" atom={marketsAtom} />
                <StateChip label="Added value" atom={addedValueValuesAtom} />
                <StateChip label="Products" atom={productsAtom} />
                <StateChip
                  label="Production systems"
                  atom={productionSystemsAtom}
                />
                <StateChip label="Countries" atom={countriesAtom} />
              </Box>
              {/* <DataBrowserDebug /> */}
              <Results
                cubesQuery={cubesQuery}
                dimensionsQuery={dimensionsQuery}
                yearsQuery={yearsQuery}
              />
            </Box>
          </Box>
        </AppLayout>
      </ThemeProvider>
    </SafeHydrate>
  );
}
