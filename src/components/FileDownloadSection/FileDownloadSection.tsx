import * as React from "react";
import { Typography, Box } from "@mui/material";
import * as GQL from "@/graphql";
import { Temporal } from "proposal-temporal";
import Link from "next/link";
import { Download } from "@/icons/icons-jsx/control";
import { Intersperse } from "@/components/Intersperse";
import { makeStyles } from "@/components/style-utils";

const useStyles = makeStyles<void, "fileTitle" | "file">()(
  ({ palette: c, spacing: s }, _params, classes) => ({
    root: {
      position: "relative",
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
      top: -15,
      left: 80,
      backgroundColor: c.cobalt[100],
      width: "fit-content",
      borderRadius: "9999px",
      padding: "0.375rem 1.125rem",
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

    file: {
      cursor: "pointer",
      padding: s(4, 0),
      "&:hover": {
        backgroundColor: c.cobalt[50],
        [`& .${classes.fileTitle}`]: { textDecoration: "underline" },
      },
      color: c.monochrome[800],
      display: "grid",
      gridTemplateColumns: "min-content 1fr",
      gridTemplateRows: "min-content min-content",
      gridTemplateAreas: '"icon title" "empty content"',
      columnGap: "1rem",
    },
    fileTitle: {
      color: c.monochrome[800],
      gridArea: "title",
      display: "flex",
      alignItems: "center",
    },
    fileIcon: { gridArea: "icon", display: "flex", color: c.cobalt[800] },
    fileContent: {
      marginTop: s(3),
      color: c.monochrome[500],
      gridArea: "content",
    },
    fileDescription: {
      marginBottom: s(2),
    },
  })
);

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
                <Box className={classes.file}>
                  <div className={classes.fileIcon}>
                    <Download width={24} height={24} />
                  </div>
                  <Typography className={classes.fileTitle} variant="h4">
                    {title}
                  </Typography>

                  <div className={classes.fileContent}>
                    <Typography variant="body1" className={classes.fileDescription} display="block">
                      {description}
                    </Typography>
                    <Typography variant="h5" component="p">
                      {`${file?.format.toUpperCase()}`} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{" "}
                      {formattedDate}
                    </Typography>
                  </div>
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
