import { AppLayout } from "@/components/layout";
import { dimensionsAtom, observationsAtom, observationsStatusAtom } from "@/domain/data";
import * as GQL from "@/graphql";
import { client } from "@/graphql/api";
import blwTheme from "@/theme/blw";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Drawer,
  DrawerProps,
  IconButton,
  Paper,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAtomValue } from "jotai";
import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";

import SidePanel from "@/components/browser/SidePanel";
import { IcControlArrowRight, IcControlDownload } from "@/icons/icons-jsx/control";
import { Trans, plural, t } from "@lingui/macro";
import { Circle } from "@mui/icons-material";
import { DimensionsResult } from "./api/use-sparql";

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

/* const HydrateAtoms = ({ children }: PropsWithChildren) => {
  useHydrateAtoms([[queryClientAtom, queryClient]]);
  return children;
};
 */
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
  const contentRef = React.useRef<HTMLDivElement>(null);
  const observations = useAtomValue(observationsAtom);
  const dimensions = useAtomValue(dimensionsAtom);
  const observationsQueryStatus = useAtomValue(observationsStatusAtom);

  const resultCount = observations.length;

  return (
    <Stack direction="row" width="100%" ref={contentRef}>
      <Box width="388px" flexGrow={0} flexShrink={0}>
        <SidePanel />
      </Box>
      <Stack bgcolor="#F0F4F7" flexGrow={1} minWidth={0} p="24px" gap={4}>
        <Stack height="80px" justifyContent="flex-end">
          <Box sx={{ width: "55px", height: "3px", backgroundColor: "#000" }} />
          <Typography variant="h1" sx={{ fontSize: "64px" }}>
            <Trans id="data.hero.title">Data download</Trans>
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" gap={1} alignItems="center">
            <Button variant="inline" startIcon={<IcControlArrowRight />}>
              <Trans id="data.actions.showFiler">Show Filters</Trans>
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
            <Button size="small" startIcon={<IcControlDownload />}>
              <Trans id="data.actions.download">Data download</Trans>
            </Button>
            <Button size="small" href="https://test.lindas.admin.ch/sparql/" target="_blank">
              <Trans id="data.actions.query">SPARQL query</Trans>
            </Button>
            <Button
              size="small"
              href="https://int.visualize.admin.ch/en/browse/organization/https%3A%2F%2Fregister.ld.admin.ch[…]-fur-landwirtschaft-blw?includeDrafts=true&dataSource=Int"
              target="_blank"
            >
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

              {observationsQueryStatus.isSuccess && (
                <>
                  <Table observations={observations} dimensions={dimensions} />
                </>
              )}
            </>
          </Paper>
        </Box>
        <ContentDrawer
          anchor="right"
          open={showMetadataPanel}
          onClose={() => setShowMetadataPanel(false)}
          container={contentRef.current}
        >
          <Box px={4} py={5}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h3">
                <Trans id="data.metadata.title">Metadata</Trans>
              </Typography>
              <IconButton onClick={() => setShowMetadataPanel(false)}>
                <IcControlArrowRight />
              </IconButton>
            </Stack>
          </Box>
        </ContentDrawer>

        {/* <DataBrowserDebug /> */}
        {/*  <Results
          cubesQuery={cubesQuery}
          //dimensionsQuery={dimensionsQuery}
          //yearsQuery={yearsQuery}
        /> */}
      </Stack>
    </Stack>
  );
};

const ContentDrawer = ({
  children,
  container,
  ...props
}: { container: HTMLDivElement | null } & PropsWithChildren & DrawerProps) => {
  return (
    <Drawer
      PaperProps={{
        style: {
          width: "388px",
          position: "absolute",
          border: "none",
          top: 0,
        },
      }}
      slotProps={{
        backdrop: {
          style: {
            position: "absolute",
            top: 0,
            backgroundColor: "transparent",
          },
        },
      }}
      SlideProps={{ timeout: { enter: 0, exit: 0 } }}
      ModalProps={{
        container,
        style: { position: "absolute", top: 0 },
      }}
      {...props}
    >
      {children}
    </Drawer>
  );
};

const Table = ({
  observations,
  dimensions,
}: {
  observations: $FixMe[];
  dimensions: DimensionsResult;
}) => {
  const columns: GridColDef[] = useMemo(() => {
    return Object.values(dimensions)
      .flat()
      .map((dimension) => {
        return {
          field: dimension.key ?? dimension.iri,
          headerName: dimension.name,
          //width: 200,
        };
      });
  }, [dimensions]);

  return <DataGrid rows={observations} columns={columns} autoPageSize />;
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
