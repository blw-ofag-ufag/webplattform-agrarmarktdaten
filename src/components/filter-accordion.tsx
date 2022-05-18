import { Accordion } from "@mui/material";

import { withStyles } from "./style-utils";

const FilterAccordion = withStyles(Accordion, (theme) => ({
  root: {
    paddingBottom: 1,
    "&.Mui-expanded": {
      marginTop: 0,
      marginBottom: 0,
      "&::before": {
        opacity: 1,
      },
    },
    "& .MuiAccordionSummary-root": {
      paddingTop: theme.spacing(2.5),
      paddingBottom: theme.spacing(2.5),
      paddingLeft: theme.spacing(4),
    },
    "& .MuiAccordionSummary-root.Mui-expanded": {
      minHeight: "48px",
      paddingTop: theme.spacing(2.5),
      paddingBottom: theme.spacing(2.5),
    },
    "& .MuiAccordionSummary-content": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: 0,
    },
    "& .MuiAccordionSummary-content.Mui-expanded": {
      margin: 0,
    },
    "& .MuiAccordionDetails-root": {
      display: "flex",
      flexDirection: "column",
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(-2),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      paddingBottom: theme.spacing(5),
    },
  },
}));

export default FilterAccordion;
