import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
  SxProps,
  Theme,
  Button,
} from "@mui/material";
import { useMemo } from "react";

import { SparqlQueryResult } from "@/pages/api/use-sparql";

import { makeStyles } from "./style-utils";

const useStyles = makeStyles({
  name: "debug-query",
})((theme) => ({
  accordion: {
    "& .MuiAccordion-root, &.MuiAccordion-root.Mui-expanded": {
      marginTop: 0,
      marginBottom: 0,
    },
    "& + &": {
      borderTop: `1px solid ${theme.palette.divider}`,
    },
  },
  accordionSummary: {
    "& .MuiAccordionSummary-content": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      alignItems: "center",
    },
    "&, &.Mui-expanded": {
      minHeight: "2rem",
      height: "2rem",
    },
    "& .MuiAccordionSummary-content.Mui-expanded": {
      marginTop: 0,
      marginBottom: 0,
    },
  },
  accordionDetails: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const SPARQL_ENDPOINT = "https://int.lindas.admin.ch/sparql";

const makeLindasLink = (query: string) => {
  const params = new URLSearchParams();
  params.append("query", query);
  return `${SPARQL_ENDPOINT}/#${params.toString()}`;
};

const DebugQuery = <T extends unknown>({
  query,
  name,
  sx,
  showData,
}: {
  query: SparqlQueryResult<T>;
  name: string;
  sx?: SxProps<Theme>;
  showData?: boolean;
}) => {
  const { classes } = useStyles();
  const { executionTime, sparqlQuery, fetching, data } = query;
  const formattedSparqlQuery = useMemo(() => {
    if (!sparqlQuery) {
      return "";
    }
    return sparqlQuery
      .replace(/^\n/, "")
      .replace(/\n+$/, "")
      .split("\n")
      .map((l) => l.replace(/^\s{4}/g, ""))
      .join("\n");
  }, [sparqlQuery]);
  return (
    <Accordion
      sx={sx}
      className={classes.accordion}
      TransitionProps={{ timeout: 0 }}
    >
      <AccordionSummary className={classes.accordionSummary}>
        <Typography variant="body2">
          {name}{" "}
          <span style={{ fontFamily: "monospace", fontSize: "small" }}>
            {executionTime && executionTime > 2000 ? "⚠️ " : null}
            {executionTime ? `${executionTime}ms` : ""}
          </span>
          {fetching ? "..." : ""}
        </Typography>
        <Button
          variant="text"
          component="a"
          href={makeLindasLink(formattedSparqlQuery)}
          target="_blank"
        >
          Lindas
        </Button>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        {showData ? (
          <Box fontSize="small" component="pre">
            {JSON.stringify(data, null, 2)}
          </Box>
        ) : null}
        <Box fontSize="small" component="pre">
          {formattedSparqlQuery}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default DebugQuery;
