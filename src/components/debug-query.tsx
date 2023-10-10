import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

import { makeStyles, withStyles } from "./style-utils";

const CompactAccordion = withStyles(
  Accordion,
  (theme) => ({
    root: {
      "&, &.Mui-expanded": {
        marginTop: 0,
        marginBottom: 0,
      },
      "& + &": {
        borderTop: `1px solid ${theme.palette.divider}`,
      },
      "& > .MuiAccordionSummary-root, & > .MuiAccordionSummary-root.Mui-expanded": {
        minHeight: "2rem",
        height: "2rem",
      },
      "& > .MuiAccordionSummary-root > .MuiAccordionSummary-content": {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
      },
      "& > .MuiAccordionSummary-content.Mui-expanded": {
        marginTop: 0,
        marginBottom: 0,
      },
      "& .MuiAccordionDetails": {
        paddingTop: 0,
        paddingBottom: 0,
        "& > * + *": {
          marginTop: "1rem",
        },
      },
    },
  }),
  {
    name: "CompactAccordion",
  }
);

const useStyles = makeStyles({ name: "DebugQuery" })((theme) => ({
  innerAccordionDetails: {
    fontSize: "small",
  },
  innerAccordionTitle: {
    fontWeight: "bold",
    color: theme.palette.grey[700],
  },
}));

const SPARQL_ENDPOINT = "https://int.lindas.admin.ch/sparql";

const makeLindasLink = (query: string) => {
  const params = new URLSearchParams();
  params.append("query", query);
  return `${SPARQL_ENDPOINT}/#${params.toString()}`;
};

const defaultRenderData = (data: $IntentionalAny) => (
  <Box fontSize="small">
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </Box>
);

const DebugQuery = <T extends unknown>({
  query,
  name,
  sx,
  renderData,
}: {
  query: SparqlQueryResult<T>;
  name: string;
  sx?: SxProps<Theme>;
  renderData?: ((data: T) => React.ReactElement | React.ReactElement[]) | boolean;
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
    <CompactAccordion sx={sx} TransitionProps={{ timeout: 0 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
      <AccordionDetails>
        {renderData && data ? (
          <CompactAccordion TransitionProps={{ timeout: 0 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="overline" className={classes.innerAccordionTitle}>
                Data
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.innerAccordionDetails}>
              {(typeof renderData === "function" ? renderData : defaultRenderData)(data)}
            </AccordionDetails>
          </CompactAccordion>
        ) : null}
        <CompactAccordion TransitionProps={{ timeout: 0 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="overline" className={classes.innerAccordionTitle}>
              Query
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.innerAccordionDetails}>
            <Box fontSize="small" component="pre">
              {formattedSparqlQuery}
            </Box>
          </AccordionDetails>
        </CompactAccordion>
      </AccordionDetails>
    </CompactAccordion>
  );
};

export default DebugQuery;
