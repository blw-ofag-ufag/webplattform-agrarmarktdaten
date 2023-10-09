import { Trans } from "@lingui/macro";
import {
  Alert,
  Box,
  createTheme,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  ThemeProvider,
} from "@mui/material";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useMemo, useState } from "react";

import { AppLayout } from "@/components/layout";
import { indicatorsAtom, marketsAtom, yearAtom } from "@/domain/data";
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
import { useLocale } from "@/lib/use-locale";
import blwTheme from "@/theme/blw";

import useSparql, { getCubeDimension, SparqlQueryResult, useCube } from "./api/use-sparql";
import SidePanel from "@/components/browser/SidePanel";

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

const useCurrentIndicator = () => {
  const [indicators] = useAtom(indicatorsAtom);
  const indicator = indicators.find((x) => x.value);
  return indicator;
};

const useFilters = () => {
  const years = useAtomValue(yearAtom);
  return {
    years,
  };
};

const Results = ({
  cubesQuery,
  dimensionsQuery, //yearsQuery,
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
    query: queryObservations(
      cubes?.length!,
      observationIris!,
      dimensions,
      indicator?.dimensionIri!,
      locale
    ),
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
    </Box>
  );
};

export function SafeHydrate({ children }: { children: React.ReactNode }) {
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    setDisplay(true);
  }, []);
  return display ? <>{children}</> : null;
}

export default function DataBrowser() {
  const locale = useLocale();
  const indicator = useCurrentIndicator();
  const setYearsAtom = useSetAtom(yearAtom);
  const [markets] = useAtom(marketsAtom);

  const { cubes } = useCube();

  const dims = cubes.map((cube) => {
    if (cube.view) {
      const dim = getCubeDimension(cube.view, "product", { locale });
      console.log(dim);
    }
  });

  console.log(dims);

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
          <Stack flexGrow={1} minHeight={0}>
            <Alert severity="info">
              <Trans id="data.alert.info">
                Our database contains Milk and Dairy Product market data. Other markets will be
                available soon.
              </Trans>
            </Alert>
            <Box
              zIndex={0}
              display="flex"
              justifyContent="stretch"
              flexGrow={1}
              minHeight={0}
              sx={{
                borderTop: "1px solid",
                borderColor: "grey.300",
              }}
            >
              <Box width="388px" flexGrow={0} flexShrink={0}>
                <SidePanel />
              </Box>
              <Box bgcolor="#eee" flexGrow={1} overflow="hidden">
                {/* <DataBrowserDebug /> */}
                <Results
                  cubesQuery={cubesQuery}
                  dimensionsQuery={dimensionsQuery}
                  yearsQuery={yearsQuery}
                />
              </Box>
            </Box>
          </Stack>
        </AppLayout>
      </ThemeProvider>
    </SafeHydrate>
  );
}
