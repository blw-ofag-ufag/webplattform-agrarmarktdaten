import { AppLayout } from "@/components/layout";
import * as GQL from "@/graphql";
import { client } from "@/graphql/api";
import blwTheme from "@/theme/blw";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";

import DataDownload from "@/components/browser/DataDownload";
import { MetadataPanel } from "@/components/browser/MetadataPanel";
import SidePanel, { ResetFiltersButton } from "@/components/browser/SidePanel";
import { Table } from "@/components/browser/Table";
import { makeStyles } from "@/components/style-utils";
import { cubeDimensionsStatusAtom, visualizeUrlAtom } from "@/domain/cubes";
import { resetCubeFiltersAtom } from "@/domain/filters";
import {
  filteredObservationsAtom,
  observationsQueryAtom,
  observationsSparqlQueryAtom,
} from "@/domain/observations";
import { IcChevronDoubleLeft, IcChevronDoubleRight } from "@/icons/icons-jsx/control";
import { useFlag } from "@/utils/flags";
import { s } from "@interactivethings/swiss-federal-ci";
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

export function SafeHydrate({ children }: { children: React.ReactNode }) {
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    setDisplay(true);
  }, []);
  return display ? <>{children}</> : null;
}

export default function DataPage(props: GQL.DataPageQuery) {
  const { dataPage, allMarketArticles, allFocusArticles } = props;

  const alternates = dataPage?._allSlugLocales?.map((loc) => ({
    href: "/data",
    as: `/${loc.value}`,
    locale: loc.locale as string,
  }));

  return (
    <SafeHydrate>
      <ThemeProvider theme={blackAndWhiteTheme}>
        <AppLayout
          alternates={alternates}
          allMarkets={allMarketArticles}
          allFocusArticles={allFocusArticles}
        >
          <DataBrowser />
        </AppLayout>
      </ThemeProvider>
    </SafeHydrate>
  );
}

const useStyles = makeStyles()(() => ({
  paper: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    minHeight: 0,
    display: "flex",
    position: "relative",
  },
}));

const DataBrowser = () => {
  const { classes } = useStyles();
  const [showMetadataPanel, setShowMetadataPanel] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const observationsQueryStatus = useAtomValue(observationsQueryAtom);
  const cubeDimensions = useAtomValue(cubeDimensionsStatusAtom);
  const filteredObservations = useAtomValue(filteredObservationsAtom);
  const query = useAtomValue(observationsSparqlQueryAtom);
  const visualizeUrl = useAtomValue(visualizeUrlAtom);
  const filteredChangedCount = useAtomValue(resetCubeFiltersAtom);

  const queriesCompleted = observationsQueryStatus.isSuccess && cubeDimensions.isSuccess;
  const resultCount = queriesCompleted ? filteredObservations.length : undefined;
  const debug = useFlag("debug");

  console.log({ observationsQueryAtom });

  return (
    <Stack
      direction="row"
      width="100vw"
      ref={contentRef}
      bgcolor="cobalt.50"
      flexGrow={1}
      minWidth={0}
    >
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
      <Stack px={s(8)} gap={4} flexGrow={1} minHeight={0}>
        <Box mt={s(24)} mb={s(4)}>
          <Box sx={{ width: "55px", height: "3px", backgroundColor: "#000" }} />
          <Typography variant="display2" component="h1">
            <Trans id="data.hero.title">Data download</Trans>
          </Typography>
        </Box>
        <Stack direction="row" justifyContent="space-between">
          <Stack
            direction="row"
            gap={1}
            alignItems="center"
            divider={<Circle sx={{ width: "4px", height: "4px", color: "grey.700" }} />}
          >
            <Button
              variant="inline"
              size="small"
              startIcon={showFilters ? <IcChevronDoubleLeft /> : <IcChevronDoubleRight />}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? (
                <Trans id="data.actions.hideFilter">Hide Filters</Trans>
              ) : (
                <Trans id="data.actions.showFilter">Show Filters</Trans>
              )}
            </Button>
            <Typography variant="body2" color="grey.600" padding={2}>
              {(observationsQueryStatus.isLoading || cubeDimensions.isLoading) && (
                <Trans id="data.filters.loading">Loading </Trans>
              )}
              {resultCount && (
                <>
                  {`${resultCount} ${t({
                    id: "data.filters.results",
                    message: plural(resultCount ?? 0, { one: "result", other: "results" }),
                  })}`}
                </>
              )}
            </Typography>
            {filteredChangedCount > 0 && queriesCompleted && (
              <Typography variant="body2" color="grey.600" padding={2}>
                {`${filteredChangedCount} ${t({
                  id: "data.filters.count",
                  message: plural(filteredChangedCount, {
                    one: "filter applied",
                    other: "filters applied",
                  }),
                })}`}
              </Typography>
            )}

            {filteredChangedCount > 0 && queriesCompleted && <ResetFiltersButton />}
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

        <Paper elevation={3} className={classes.paper}>
          <>
            {observationsQueryStatus.isSuccess && cubeDimensions.isSuccess ? (
              <Box sx={{ position: "absolute", inset: 0 }}>
                <Table
                  observations={filteredObservations}
                  dimensions={{
                    ...cubeDimensions.data.measures,
                    ...cubeDimensions.data.properties,
                  }}
                />
              </Box>
            ) : (
              <Stack gap={2} alignItems="center">
                <CircularProgress size={24} />
                <Typography variant="h5" fontWeight="normal">
                  <Trans id="data.loading.info">Loading data...</Trans>
                </Typography>
              </Stack>
            )}
          </>
        </Paper>

        {cubeDimensions.isSuccess && showMetadataPanel && (
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
