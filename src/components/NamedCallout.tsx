import * as React from "react";
import { Typography, Box } from "@mui/material";
import { makeStyles } from "@/components/style-utils";

const useNamedCalloutStyles = makeStyles()(({ palette: c, breakpoints: b }) => ({
  root: {
    position: "relative",
    paddingTop: "1rem",
    "--px": "4.375rem",
    "--py": "3rem",
    "--border-size": "4px",
    [b.down("md")]: {
      "--px": "1.25rem",
      "--py": "2rem",
    },
  },

  content: {
    border: `${c.cobalt[100]} var(--border-size) solid`,
    borderRadius: "12px",
    backgroundColor: `${c.cobalt[50]}`,
    paddingLeft: "var(--px)",
    paddingRight: "var(--px)",
    paddingBottom: "var(--py)",
    paddingTop: "var(--py)",
  },

  legend: {
    position: "absolute",
    top: 0,
    left: "calc(var(--px) + var(--border-size))",
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
