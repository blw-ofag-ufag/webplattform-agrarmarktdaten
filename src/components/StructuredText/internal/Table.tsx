import * as GQL from "@/graphql";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@/components/style-utils";
import { Typography } from "@mui/material";

const useStyles = makeStyles()(({ palette: c, spacing: s, shadows }, _params) => ({
  table: {
    width: "100%",
    display: "block",
    boxShadow: shadows[4],
  },
  header: {
    display: "inline-table",
    width: "100%",
    backgroundColor: c.cobalt[50],
    border: "none",
    borderBottom: `1px solid ${c.monochrome[300]}`,
  },

  body: {
    display: "block",
    width: "100%",
  },

  headerCell: {
    border: "none",
    padding: s(4, 5),
    textTransform: "uppercase",
    fontWeight: 400,
    color: c.cobalt[500],
  },

  row: {
    display: "flex",
    borderBottom: `1px solid ${c.monochrome[300]}`,
    "&:last-child": {
      borderBottom: "none",
    },
  },

  bodyCell: {
    padding: s(4, 5),
    border: "none",
    wordWrap: "break-word",
  },
}));

interface Props {
  content: GQL.TableRecord["content"];
}

const JsonTable = (props: Props) => {
  const { content } = props;
  const { columns, data } = content;
  const { classes } = useStyles();
  return (
    <Table className={classes.table}>
      <TableHead className={classes.header}>
        <TableRow className={classes.row}>
          {columns.length > 0 &&
            columns.map((col: any, i: number) => {
              return (
                <TableCell key={i} className={classes.headerCell}>
                  <Typography variant="body3" color="textSecondary">
                    {col}
                  </Typography>
                </TableCell>
              );
            })}
        </TableRow>
      </TableHead>
      <TableBody className={classes.body}>
        {data.length > 0 &&
          data.map((row: Record<string, any>, i: number) => {
            const cells = Object.values(row);
            return (
              <TableRow key={i} className={classes.row}>
                {cells.map((cell, i) => {
                  return (
                    <TableCell key={i} className={classes.bodyCell}>
                      <Typography variant="body2" color="textSecondary">
                        {cell as any}
                      </Typography>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};

export default JsonTable;
