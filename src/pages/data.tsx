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
import { useAtomValue, useSetAtom } from "jotai";
import React, { useState } from "react";

import { useIsDesktop, useIsTablet } from "@/components/Grid/Grid";
import ActionButton from "@/components/browser/ActionButton";
import DataDownload from "@/components/browser/DataDownload";
import EnvSwitch from "@/components/browser/EnvSwitch";
import { MetadataPanel } from "@/components/browser/MetadataPanel";
import MobileIntercept from "@/components/browser/MobileIntercept";
import SidePanel from "@/components/browser/SidePanel";
import { Table } from "@/components/browser/Table";
import { makeStyles } from "@/components/style-utils";
import { cubeDimensionsStatusAtom } from "@/domain/cubes";
import { filterAtom } from "@/domain/filters";
import {
  filteredObservationsAtom,
  observationsQueryAtom,
  observationsSparqlQueryAtom,
} from "@/domain/observations";
import { IcChevronDoubleLeft, IcChevronDoubleRight } from "@/icons/icons-jsx/control";
import { useFlag } from "@/utils/flags";
import { CSSObject } from "@emotion/react";
import { s } from "@interactivethings/swiss-federal-ci";
import { Trans, plural, t } from "@lingui/macro";
import { Circle } from "@mui/icons-material";
import { DevTools } from "jotai-devtools";
import { isUndefined } from "lodash";
import Head from "next/head";
import { renderMetaTags } from "react-datocms";
import DebugDataPage from "../components/DebugDataPage";
import { SafeHydrate } from "@/components/SafeHydrate";
import { ErrorAlert } from "../components/ErrorAlert";
import { errorAsString } from "../utils/errorAsString";
import { ShareButton } from "@/components/ShareButton";
import RepeatIcon from "@/icons/icons-jsx/control/IcRepeat";

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

export default function DataPage(props: GQL.DataPageQuery) {
  const { dataPage, allMarketArticles, allFocusArticles, allMethodsPages, site } = props;
  const [acceptedWarning, setAcceptedWarning] = useState(false);

  const showEnvironments = useFlag("environments");

  const alternates = dataPage?._allSlugLocales?.map((loc) => ({
    href: "/data",
    as: `/${loc.value}`,
    locale: loc.locale as string,
  }));

  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();

  return (
    <SafeHydrate>
      <Head>{renderMetaTags([...(dataPage?.seo ?? []), ...site?.favicon])}</Head>
      <ThemeProvider theme={blackAndWhiteTheme}>
        <AppLayout
          alternates={alternates}
          allMarkets={allMarketArticles}
          allFocusArticles={allFocusArticles}
          allMethodsPages={allMethodsPages}
        >
          {isTablet || isDesktop || acceptedWarning ? (
            <>
              {showEnvironments && <EnvSwitch />}
              <DataBrowser />
              {process.env.NODE_ENV === "development" && (
                <Box sx={{ position: "absolute", bottom: 0 }}>
                  <DevTools />
                </Box>
              )}
            </>
          ) : (
            <MobileIntercept onAccept={() => setAcceptedWarning(true)} />
          )}
        </AppLayout>
      </ThemeProvider>
    </SafeHydrate>
  );
}

const useStyles = makeStyles()((theme) => ({
  paper: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    minHeight: 0,
    display: "flex",
    position: "relative",
  },
  filterButton: {
    padding: theme.spacing(2, 1),
    ...(theme.typography.body2 as CSSObject),
  },
  resetButton: {
    borderRadius: theme.spacing(4),
    backgroundColor: theme.palette.monochrome[200],
    color: theme.palette.monochrome[800],
    maxHeight: "26px",
    minHeight: "auto",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.monochrome[300],
    },
    ...(theme.typography.body3 as CSSObject),
  },
  button: {
    borderRadius: "2px",
  },
}));

const DataBrowser = () => {
  const { classes } = useStyles();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();
  const [showMetadataPanel, setShowMetadataPanel] = useState(false);
  const [showFilters, setShowFilters] = useState(isDesktop);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const observationsQueryStatus = useAtomValue(observationsQueryAtom);
  const filteredObservations = useAtomValue(filteredObservationsAtom);
  const cubeDimensions = useAtomValue(cubeDimensionsStatusAtom);
  const query = useAtomValue(observationsSparqlQueryAtom);
  const setFilters = useSetAtom(filterAtom);

  // const visualizeUrl = useAtomValue(visualizeUrlAtom);
  const { changed: filteredChangedCount } = useAtomValue(filterAtom);

  const queriesCompleted = observationsQueryStatus.isSuccess && cubeDimensions.isSuccess;
  const resultCount =
    queriesCompleted && filteredObservations ? filteredObservations.length : undefined;
  const debug = useFlag("debug");

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

      <Box width={(isTablet || isDesktop) && showFilters ? "388px" : 0} flexGrow={0} flexShrink={0}>
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
      <Stack px={s(8)} pt={s(8)} pb={s(7)} gap={4} flexGrow={1} minHeight={0}>
        <Stack
          direction="row"
          justifyContent="space-between"
          flexWrap="wrap"
          rowGap={3}
          columnGap={2}
        >
          <Stack
            direction="row"
            alignItems="center"
            divider={<Circle sx={{ width: "4px", height: "4px", color: "grey.700" }} />}
            gap={2}
            flexWrap="wrap"
          >
            <Button
              variant="inline"
              className={classes.filterButton}
              startIcon={showFilters ? <IcChevronDoubleLeft /> : <IcChevronDoubleRight />}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? (
                <Trans id="data.actions.hideFilter">Hide Filters</Trans>
              ) : (
                <Trans id="data.actions.showFilter">Show Filters</Trans>
              )}
            </Button>
            <Typography variant="body2" color="grey.600">
              {(observationsQueryStatus.isLoading || cubeDimensions.isLoading) && (
                <Trans id="data.filters.loading">Loading </Trans>
              )}
              {!isUndefined(resultCount) && (
                <>
                  {`${resultCount} ${t({
                    id: "data.filters.results",
                    message: plural(resultCount ?? 0, { one: "result", other: "results" }),
                  })}`}
                </>
              )}
            </Typography>
            {filteredChangedCount > 0 && queriesCompleted && (
              <Typography variant="body2" color="grey.600">
                {`${filteredChangedCount} ${t({
                  id: "data.filters.count",
                  message: plural(filteredChangedCount, {
                    one: "filter applied",
                    other: "filters applied",
                  }),
                })}`}
              </Typography>
            )}
            {filteredChangedCount > 0 && queriesCompleted && (
              <Button
                className={classes.resetButton}
                onClick={() => setFilters({ action: "reset" })}
              >
                <Trans id="data.actions.reset">Reset Filters</Trans>
                <RepeatIcon width={16} height={16} />
              </Button>
            )}
          </Stack>

          <Stack direction="row" gap={3} flexWrap="wrap">
            <DataDownload />
            <ActionButton
              className={classes.button}
              disabled={!query}
              href={query ?? ""}
              target="_blank"
            >
              <Trans id="data.actions.query">SPARQL query</Trans>
            </ActionButton>
            {/**
             * Hide visualize button for now, as support for BLW datasets in Visualize is still
             * in progress.
             */}
            {/* <ActionButton href={visualizeUrl ?? ""} target="_blank">
              <Trans id="data.actions.visualize">Visualize</Trans>
            </ActionButton> */}
            <ActionButton
              className={classes.button}
              variant="outlined"
              onClick={() => setShowMetadataPanel(true)}
            >
              <Trans id="data.actions.metadata">Metadata</Trans>
            </ActionButton>
            <Box sx={{ position: "relative" }}>
              <ShareButton />
            </Box>
          </Stack>
        </Stack>

        <Paper elevation={3} className={classes.paper}>
          <>
            {observationsQueryStatus.isSuccess &&
              cubeDimensions.isSuccess &&
              filteredObservations && (
                <Box sx={{ position: "absolute", inset: 0 }}>
                  <Table
                    observations={filteredObservations}
                    dimensions={{
                      ...cubeDimensions.data.measures,
                      ...cubeDimensions.data.properties,
                    }}
                  />
                </Box>
              )}
            {(observationsQueryStatus.isLoading || cubeDimensions.isLoading) && (
              <Stack gap={2} alignItems="center">
                <CircularProgress size={24} />
                <Typography variant="h5" fontWeight="normal">
                  <Trans id="data.loading.info">Loading data...</Trans>
                </Typography>
              </Stack>
            )}

            {observationsQueryStatus.error || cubeDimensions.error ? (
              <ErrorAlert
                details={
                  <Box component="pre" fontSize="small">
                    {observationsQueryStatus.error ? (
                      <>Observations: {errorAsString(observationsQueryStatus.error)}</>
                    ) : null}
                    {"\n"}
                    {cubeDimensions.error ? (
                      <>Dimensions: {errorAsString(cubeDimensions.error)}</>
                    ) : null}
                  </Box>
                }
              />
            ) : null}
          </>
        </Paper>
      </Stack>
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
