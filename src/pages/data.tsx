import { AppLayout } from "@/components/layout";
import * as GQL from "@/graphql";
import { client } from "@/graphql/api";
import blwTheme from "@/theme/blw";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";

import DataDownload from "@/components/browser/DataDownload";
import { MetadataPanel } from "@/components/browser/MetadataPanel";
import SidePanel from "@/components/browser/SidePanel";
import { Table } from "@/components/browser/Table";
import { cubeDimensionsStatusAtom, visualizeUrlAtom } from "@/domain/cubes";
import {
  filteredObservationsAtom,
  observationsQueryAtom,
  observationsSparqlQueryAtom,
} from "@/domain/observations";
import { IcChevronDoubleLeft, IcChevronDoubleRight } from "@/icons/icons-jsx/control";
import { useFlag } from "@/utils/flags";
import { Trans, plural, t } from "@lingui/macro";
import { Circle } from "@mui/icons-material";
import DebugDataPage from "../components/DebugDataPage";

const blackAndWhiteTheme = createTheme(blwTheme, {
  palette: {
    primary: {
      main: blwTheme.palette.cobalt[500],
    },
    secondary: {
      main: blwTheme.palette.grey[400],
    },
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export function SafeHydrate({ children }: { children: React.ReactNode }) {
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    setDisplay(true);
  }, []);
  return display ? <>{children}</> : null;
}

export default function DataPage(props: GQL.DataPageQuery) {
  const { allMarketArticles, allFocusArticles } = props;
  return (
    <SafeHydrate>
      <ThemeProvider theme={blackAndWhiteTheme}>
        <AppLayout allMarkets={allMarketArticles} allFocusArticles={allFocusArticles}>
          <Stack flexGrow={1} minHeight={0}>
            <Box
              zIndex={0}
              display="flex"
              //justifyContent="stretch"
              flexGrow={1}
              minHeight={0}
              sx={{
                borderTop: "1px solid",
                borderColor: "grey.300",
              }}
            >
              <DataBrowser />
            </Box>
          </Stack>
        </AppLayout>
      </ThemeProvider>
      <ReactQueryDevtools client={queryClient} />
    </SafeHydrate>
  );
}

const DataBrowser = () => {
  const [showMetadataPanel, setShowMetadataPanel] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const observationsQueryStatus = useAtomValue(observationsQueryAtom);
  const cubeDimensions = useAtomValue(cubeDimensionsStatusAtom);
  const filteredObservations = useAtomValue(filteredObservationsAtom);
  const query = useAtomValue(observationsSparqlQueryAtom);
  const visualizeUrl = useAtomValue(visualizeUrlAtom);

  const resultCount = observationsQueryStatus.isSuccess ? filteredObservations.length : undefined;
  const debug = useFlag("debug");

  return (
    <Stack direction="row" width="100%" ref={contentRef}>
      {debug ? <DebugDataPage /> : null}

      <Box width={showFilters ? "388px" : 0} flexGrow={0} flexShrink={0}>
        <SidePanel
          open={showFilters}
          onClose={() => setShowFilters(false)}
          slots={{
            drawer: {
              container: contentRef.current,
            },
          }}
        />
      </Box>
      <Stack bgcolor="cobalt.50" flexGrow={1} minWidth={0} p="24px" gap={4}>
        <Stack height="80px" justifyContent="flex-end">
          <Box sx={{ width: "55px", height: "3px", backgroundColor: "#000" }} />
          <Typography variant="h1" sx={{ fontSize: "64px" }}>
            <Trans id="data.hero.title">Data download</Trans>
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" gap={1} alignItems="center">
            <Button
              variant="inline"
              startIcon={showFilters ? <IcChevronDoubleLeft /> : <IcChevronDoubleRight />}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? (
                <Trans id="data.actions.hideFilter">Hide Filters</Trans>
              ) : (
                <Trans id="data.actions.showFilter">Show Filters</Trans>
              )}
            </Button>
            <Circle sx={{ width: "4px", height: "4px", color: "grey.700" }} />
            <Typography variant="body2" color="grey.600" padding={2}>
              {observationsQueryStatus.isLoading && (
                <Trans id="data.filters.loading">Loading </Trans>
              )}
              {observationsQueryStatus.isSuccess && (
                <>
                  {`${resultCount} ${t({
                    id: "data.filters.results",
                    message: plural(resultCount ?? 0, { one: "result", other: "results" }),
                  })}`}
                </>
              )}
            </Typography>
          </Stack>
          <Stack direction="row" gap={2}>
            <DataDownload />
            <Button size="small" disabled={!query} href={query ?? ""} target="_blank">
              <Trans id="data.actions.query">SPARQL query</Trans>
            </Button>
            <Button size="small" href={visualizeUrl ?? ""} target="_blank">
              <Trans id="data.actions.visualize">Visualize</Trans>
            </Button>
            <Button size="small" onClick={() => setShowMetadataPanel(true)}>
              <Trans id="data.actions.metadata">Metadata</Trans>
            </Button>
          </Stack>
        </Stack>

        <Box flexGrow={1} minHeight={0} sx={{ overflowY: "auto" }}>
          <Paper
            elevation={4}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <>
              {observationsQueryStatus.isLoading && <CircularProgress size={24} />}
              {observationsQueryStatus.isError && (
                <Alert
                  sx={{
                    width: "70%",
                  }}
                  severity="error"
                >
                  <AlertTitle>Error</AlertTitle>
                </Alert>
              )}

              {observationsQueryStatus.isSuccess && cubeDimensions.isSuccess ? (
                <Table
                  observations={filteredObservations}
                  dimensions={{
                    ...cubeDimensions.data.measures,
                    ...cubeDimensions.data.properties,
                  }}
                />
              ) : (
                <CircularProgress size={24} />
              )}
            </>
          </Paper>
        </Box>
        {cubeDimensions.isSuccess && (
          <MetadataPanel
            dimensions={cubeDimensions.data}
            open={showMetadataPanel}
            onClose={() => setShowMetadataPanel(false)}
            slots={{
              drawer: {
                container: contentRef.current,
              },
            }}
          />
        )}
      </Stack>
    </Stack>
  );
};

export const getStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.DataPageQuery>(
      GQL.DataPageDocument,
      { locale: context.locale },
      { requestPolicy: "network-only" }
    )
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return { props: result.data };
};
