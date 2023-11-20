import { isMeasure } from "@/domain/dimensions";
import { valueFormatter } from "@/domain/observations";
import { Measure, Observation, Property } from "@/pages/api/data";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useMemo } from "react";

export const Table = ({
  observations,
  dimensions,
}: {
  observations: Observation[];
  dimensions: Record<string, Property | Measure>;
}) => {
  const columns: GridColDef[] = useMemo(() => {
    return Object.values(dimensions)
      .flat()
      .map((dimension) => {
        return {
          field: isMeasure(dimension.dimension) ? "measure" : dimension.dimension,
          headerName: dimension.label,
          //width: 200,
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
      getRowId={(row) => row.observation}
      autoPageSize
    />
  );
};
