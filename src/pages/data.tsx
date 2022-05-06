import { ExpandMore } from "@material-ui/icons";
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
} from "@mui/material";
import { useAtom, WritableAtom } from "jotai";
import React, { useMemo, useState } from "react";

import { AppLayout } from "@/components/layout";
import {
  addedValueValuesAtom,
  CheckboxValue,
  countriesAtom,
  indicatorsAtom,
  marketsAtom,
  monthsAtom,
  productionSystemsAtom,
  yearAtom,
} from "@/domain/data";
import useEvent from "@/lib/use-event";
import theme from "@/theme";

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

const MultiCheckbox = ({
  values,
  onChange,
}: {
  values: CheckboxValue[];
  onChange: (v: CheckboxValue[]) => void;
}) => {
  const handleChange = (i: number, value: boolean) => {
    const newValues = [
      ...values.slice(0, i),
      { ...values[i], value },
      ...values.slice(i + 1),
    ];
    console.log(newValues);
    onChange(newValues);
  };
  const trueValues = useMemo(() => values.filter((x) => x.value), [values]);
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
          control={
            <Checkbox
              checked={value.value}
              disabled={value.value && trueValues.length === 1}
            />
          }
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
        paddingBottom: 16,
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
  return trueValues.length === values.length ? null : (
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
      <FilterAccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
        <MultiCheckbox values={values} onChange={setValues} />
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
      <FilterAccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
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
      <FilterAccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
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
      <FilterAccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
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
      <FilterAccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
        <MultiCheckbox values={values} onChange={setValues} />
      </FilterAccordionDetails>
    </FilterAccordion>
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
      <FilterAccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
        <MultiCheckbox values={values} onChange={setValues} />
      </FilterAccordionDetails>
    </FilterAccordion>
  );
};

const MenuContent = () => {
  const [expanded, setExpanded] = useState<string | undefined>("indicator");
  return (
    <>
      <IndicatorAccordion
        expanded={expanded === "indicator"}
        onChange={(e, isExpanded) =>
          setExpanded(isExpanded ? "indicator" : undefined)
        }
      />
      <TimeAccordion
        expanded={expanded === "time"}
        onChange={(e, isExpanded) =>
          setExpanded(isExpanded ? "time" : undefined)
        }
      />
      <MarketsAccordion
        expanded={expanded === "markets"}
        onChange={(e, isExpanded) =>
          setExpanded(isExpanded ? "markets" : undefined)
        }
      />
      <AddedValueAccordion
        expanded={expanded === "addedvalue"}
        onChange={(e, isExpanded) =>
          setExpanded(isExpanded ? "addedvalue" : undefined)
        }
      />
      <ProductionSystemsAccordion
        expanded={expanded === "productionsystems"}
        onChange={(e, isExpanded) =>
          setExpanded(isExpanded ? "productionsystems" : undefined)
        }
      />
      <CountriesAccordion
        expanded={expanded === "countries"}
        onChange={(e, isExpanded) =>
          setExpanded(isExpanded ? "countries" : undefined)
        }
      />
    </>
  );
};

const DebugCard = ({
  title,
  value,
}: {
  title: string;
  value: $IntentionalAny;
}) => {
  return (
    <div>
      <Typography variant="h5">{title}</Typography>
      <pre style={{ fontSize: "small" }}>{JSON.stringify(value, null, 2)}</pre>
    </div>
  );
};

const StorageDebug = () => {
  const [indicators] = useAtom(indicatorsAtom);
  const [markets] = useAtom(marketsAtom);
  const [addedValueValues] = useAtom(addedValueValuesAtom);
  const [productionSystems] = useAtom(productionSystemsAtom);
  const [monthOptions] = useAtom(monthsAtom);
  return (
    <Box
      display="grid"
      mx={4}
      sx={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
    >
      <DebugCard title="Indicators" value={indicators} />
      <DebugCard title="Markets" value={markets} />
      <DebugCard title="Added value" value={addedValueValues} />
      <DebugCard title="Production systems" value={productionSystems} />
      <DebugCard title="Month options" value={monthOptions} />
    </Box>
  );
};

const StateChip = ({
  label,
  atom,
}: {
  label: string;
  atom: WritableAtom<CheckboxValue[], CheckboxValue[]>;
}) => {
  const [values, setValues] = useAtom(atom);
  const trueValues = useMemo(() => values.filter((x) => x.value), [values]);
  if (values.length === trueValues.length) {
    return null;
  }
  return (
    <Grow in>
      <Chip
        onDelete={() => {
          setValues(values.map((x) => ({ ...x, value: true })));
        }}
        title={values.map((x) => x.label).join(", ")}
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

export default function DataBrowser() {
  return (
    <ThemeProvider theme={blackAndWhiteTheme}>
      <AppLayout>
        <Box
          mt="92px"
          py={16}
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
              <StateChip label="Markets" atom={marketsAtom} />
              <StateChip label="Added value" atom={addedValueValuesAtom} />
              <StateChip
                label="Production systems"
                atom={productionSystemsAtom}
              />
              <StateChip label="Countries" atom={countriesAtom} />
            </Box>
            {/* <StorageDebug /> */}
          </Box>
        </Box>
      </AppLayout>
      ;
    </ThemeProvider>
  );
}
