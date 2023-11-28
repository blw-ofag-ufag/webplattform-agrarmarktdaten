import {
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
  Link,
  CircularProgress,
} from "@mui/material";
import { useAtomValue } from "jotai";
import React, { useState } from "react";
import { filteredObservationsAtom, observationsQueryAtom } from "@/domain/observations";
import { IcControlClose, IcControlExternal } from "@/icons/icons-jsx/control";
import { ObjectInspector } from "react-inspector";
import { makeStyles } from "@/components/style-utils";
import { cubeDimensionsStatusAtom } from "@/domain/cubes";

const useDebugStyles = makeStyles()((theme) => ({
  root: {
    padding: theme.spacing(2),
    position: "fixed",
    right: 0,
    zIndex: 1,
    background: "paper",
    maxWidth: 400,
  },
}));
const DebugDataPage = () => {
  const observations = useAtomValue(filteredObservationsAtom);
  const observationsQuery = useAtomValue(observationsQueryAtom);
  const cubeDimensions = useAtomValue(cubeDimensionsStatusAtom);
  const [expanded, setExpanded] = useState(false);
  const { classes } = useDebugStyles();
  return (
    <Paper className={classes.root}>
      {expanded ? (
        <>
          <IconButton
            size="small"
            onClick={() => setExpanded(false)}
            sx={{ position: "absolute", top: "0.25rem", right: "0.25rem" }}
          >
            <IcControlClose fontSize="small" />
          </IconButton>
          <Stack spacing={2} sx={{ fontSize: "small" }}>
            <div>
              <Typography variant="h5">Observations</Typography>
              <ObjectInspector data={observations} />
            </div>
            <div>
              <Typography variant="h5">Observations query status</Typography>
              <ObjectInspector data={observationsQuery} />
              {observationsQuery.data?.query ? (
                <Link
                  target="_blank"
                  href={observationsQuery.data.query}
                  sx={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
                >
                  Lindas
                  <IcControlExternal />
                </Link>
              ) : null}
            </div>
            <div>
              <Typography variant="h5">Cube dimensions</Typography>
              {cubeDimensions.isSuccess ? (
                <ObjectInspector data={cubeDimensions.data} />
              ) : (
                <CircularProgress />
              )}
            </div>
          </Stack>
        </>
      ) : (
        <Button size="small" onClick={() => setExpanded(true)}>
          debug
        </Button>
      )}
    </Paper>
  );
};

export default DebugDataPage;
