import * as React from "react";
import { Typography, Box } from "@mui/material";
import * as GQL from "@/graphql";
import { s, c } from "@interactivethings/swiss-federal-ci";
import { Temporal } from "proposal-temporal";
import Link from "next/link";
import { Download } from "@/icons/icons-jsx/control";
import { Intersperse } from "@/components/Intersperse";
import { makeStyles } from "@/components/style-utils";

const useStyles = makeStyles()(({ palette: c }) => ({
  root: {
    position: "relative",
    border: `${c.cobalt[100]} 4px solid`,
    borderRadius: "12px",
    backgroundColor: `${c.cobalt[50]}`,
    paddingX: s(20),
    paddingBottom: s(12),
    paddingTop: s(15),
    marginTop: s(10),
  },

  legend: {
    position: "absolute",
    top: -15,
    left: 80,
    backgroundColor: c.cobalt[100],
    width: "fit-content",
    borderRadius: 100,
    padding: s(3, 1),
  },

  separator: {
    height: "1px",
    width: "100%",
    backgroundColor: c.cobalt[200],
  },

  title: {
    fontWeight: 700,
    color: c.cobalt[800],
  },
}));

interface Props {
  data: Partial<GQL.FileDownloadSectionRecord>;
  className?: string;
}

const FileDownloadSection = (props: Props) => {
  const { classes, cx } = useStyles();
  const { data } = props;
  return (
    <Box key={data.id} className={cx(classes.root, props.className)}>
      <Box className={classes.legend}>
        <Typography variant="body2" className={classes.title}>
          {data.title}
        </Typography>
      </Box>
      <Intersperse separator={<div className={classes.separator} />}>
        {data.fileDownloadItems?.map((item) => {
          const { id, date, title, file, description } = item;
          let formattedDate = "";
          if (date) {
            const date2 = Temporal.PlainDate.from(date);
            const day = String(date2.day).padStart(2, "0");
            const month = String(date2.month).padStart(2, "0");
            const year = String(date2.year);
            formattedDate = `${day}.${month}.${year}`;
          }
          return (
            file?.url && (
              <Link href={file.url} key={id} legacyBehavior>
                <Box
                  sx={{
                    cursor: "pointer",
                    py: s(4),
                    ":hover": {
                      backgroundColor: c.cobalt[50],
                      ".title": { textDecoration: "underline" },
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Download width={24} height={24} />
                    <Typography
                      className="title"
                      variant="h3"
                      sx={{ ml: s(4), color: c.cobalt[800] }}
                    >
                      {title}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: s(10.5), mt: s(3), color: c.cobalt[500] }}>
                    <Typography variant="body1" sx={{ mb: s(2) }}>
                      {description}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      {`${file?.format.toUpperCase()}`} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{" "}
                      {formattedDate}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            )
          );
        })}
      </Intersperse>
    </Box>
  );
};

export default FileDownloadSection;
