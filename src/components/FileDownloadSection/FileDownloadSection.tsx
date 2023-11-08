import * as React from "react";
import { Typography, Box } from "@mui/material";
import * as GQL from "@/graphql";
import { Temporal } from "proposal-temporal";
import Link from "next/link";
import { Download } from "@/icons/icons-jsx/control";
import { Intersperse } from "@/components/Intersperse";
import { makeStyles } from "@/components/style-utils";
import { NamedCallout } from "@/components/NamedCallout";

const useStyles = makeStyles<void, "fileTitle" | "file">()(
  ({ palette: c, spacing: s }, _params, classes) => ({
    separator: {
      height: "1px",
      width: "100%",
      backgroundColor: c.cobalt[200],
      margin: "1rem 0",
    },

    file: {
      cursor: "pointer",
      padding: s(2, 0),
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
  const { classes } = useStyles();
  const { data } = props;
  return (
    <NamedCallout title={data.title}>
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
    </NamedCallout>
  );
};

export default FileDownloadSection;
