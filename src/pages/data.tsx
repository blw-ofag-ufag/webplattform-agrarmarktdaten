import { Trans } from "@lingui/macro";
import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  createTheme,
  Stack,
  ThemeProvider,
} from "@mui/material";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { AppLayout } from "@/components/layout";
import { indicatorAtom, marketsAtom } from "@/domain/data";
import blwTheme from "@/theme/blw";

import SidePanel from "@/components/browser/SidePanel";
import { CubeResult, fetchPossibleCubes, lindasClient } from "./api/use-sparql";

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

export function SafeHydrate({ children }: { children: React.ReactNode }) {
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    setDisplay(true);
  }, []);
  return display ? <>{children}</> : null;
}

export default function DataPage() {
  return (
    <SafeHydrate>
      <QueryClientProvider client={lindasClient}>
        <ReactQueryDevtools />
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
      </QueryClientProvider>
    </SafeHydrate>
  );
}

const DataBrowser = () => {
  // const locale = useLocale();
  const indicator = useAtom(indicatorAtom);
  const [markets] = useAtom(marketsAtom);

  console.log({
    indicator,
    markets,
  });

  const cubesQuery = useQuery<CubeResult[], Error>(["cubes"], fetchPossibleCubes);

  /* const dims = cubes.map((cube) => {
    if (cube.view) {
      const dim = getCubeDimension(cube.view, "product", { locale });
      console.log(dim);
    }
  });

  console.log(dims); */

  return (
    <Stack direction="row" width="100%">
      <Box width="388px" flexGrow={0} flexShrink={0}>
        <SidePanel />
      </Box>
      <Stack
        bgcolor="#eee"
        flexGrow={1}
        minWidth={0}
        justifyContent="center"
        alignItems="center"
        p="24px"
      >
        {cubesQuery.isLoading && <CircularProgress size={24} />}
        {cubesQuery.isError && (
          <Alert
            sx={{
              width: "70%",
            }}
            severity="error"
          >
            <AlertTitle>Error</AlertTitle>
            {cubesQuery.error.message}
          </Alert>
        )}
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
