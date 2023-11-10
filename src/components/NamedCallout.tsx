import * as React from "react";
import { Typography, Box } from "@mui/material";
import { makeStyles } from "@/components/style-utils";

const useNamedCalloutStyles = makeStyles()(({ palette: c }) => ({
  root: {
    position: "relative",
    paddingTop: "1rem",
  },

  content: {
    border: `${c.cobalt[100]} 4px solid`,
    borderRadius: "12px",
    backgroundColor: `${c.cobalt[50]}`,
    paddingLeft: "4.375rem",
    paddingRight: "4.375rem",
    paddingBottom: "3rem",
    paddingTop: "3rem",
  },

  legend: {
    position: "absolute",
    top: 0,
    left: 80,
    backgroundColor: c.cobalt[100],
    width: "fit-content",
    borderRadius: "9999px",
    padding: "0.375rem 1.125rem",
  },

  title: {
    fontWeight: 700,
    color: c.cobalt[800],
  },
}));

export const NamedCallout = ({
  title,
  ...props
}: Omit<React.HTMLProps<"div">, "title"> & { title?: string | null | undefined }) => {
  const { classes, cx } = useNamedCalloutStyles();

  return (
    <div className={cx(classes.root, props.className)}>
      {title ? (
        <Box className={classes.legend}>
          <Typography variant="body2" className={classes.title}>
            {title}
          </Typography>
        </Box>
      ) : null}
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
