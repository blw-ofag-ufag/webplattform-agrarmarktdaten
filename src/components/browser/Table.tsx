import { isMeasure } from "@/domain/dimensions";
import { valueFormatter } from "@/domain/observations";
import { Measure, Observation, Property } from "@/pages/api/data";
import { DataGrid, GridColDef, gridClasses } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { makeStyles } from "../style-utils";

const columnSpecs = {
  price: { width: 100 },
  date: { width: 100 },
  "cost-component": { width: 100 },
  currency: { width: 100 },
  "data-method": { width: 100 },
  "data-source": { width: 200 },
  "foreign-trade": { width: 100 },
  "key-indicator-type": { width: 100 },
  market: { width: 200 },
  product: { width: 200 },
  "product-group": { width: 200 },
  "production-system": { width: 150 },
  "product-origin": { width: 100 },
  "product-properties": { width: 100 },
  "product-subgroup": { width: 200 },
  "sales-region": { width: 100 },
  unit: { width: 100 },
  usage: { width: 100 },
  "value-chain-detail": { width: 100 },
  "value-chain": { width: 100 },
};

const useStyles = makeStyles()(({ palette: c, shadows: e, typography }) => ({
  dataGrid: {
    border: "1px solid",
    borderColor: c.cobalt[100],
    boxShadow: e.xxl,
    color: c.grey[600],
    [`& .${gridClasses.columnHeaders}`]: {
      backgroundColor: c.cobalt[50],
      textTransform: "uppercase",
      borderBottom: "2px solid",
      borderColor: c.cobalt[100],
      fontWeight: typography.fontWeightRegular,
    },
    [`& .${gridClasses.row}`]: {
      borderBottom: "2px solid",
      borderColor: c.cobalt[100],
    },
  },
}));

export const Table = ({
  observations,
  dimensions,
}: {
  observations: Observation[];
  dimensions: Record<string, Property | Measure>;
}) => {
  const [paginationModel, setPaginationModel] = useState({ pageSize: 25, page: 0 });
  const { classes } = useStyles();
  const columns: GridColDef[] = useMemo(() => {
    return Object.values(dimensions)
      .flat()
      .map((dimension) => {
        return {
          field: isMeasure(dimension.dimension)
            ? "measure"
            : dimension.dimension === "date"
            ? "formatted-date"
            : dimension.dimension,
          headerName: dimension.label,
          width: columnSpecs[dimension.dimension as keyof typeof columnSpecs]?.width || 100,
          valueFormatter: (params) =>
            valueFormatter({
              value: params.value,
              dimension: dimension.dimension,
              cubeDimensions: dimensions,
            }),
        };
      });
  }, [dimensions]);

  return (
    <DataGrid
      rows={observations}
      columns={columns}
      //autoPageSize
      paginationModel={paginationModel}
      onPaginationModelChange={(pm) => setPaginationModel(pm)}
      getRowId={(row) => row.observation}
      className={classes.dataGrid}
      rowHeight={48}
      columnHeaderHeight={48}
    />
  );
};
