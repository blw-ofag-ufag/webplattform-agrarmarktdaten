import { dimensionsToShowSorted, isMeasure } from "@/domain/dimensions";
import { valueFormatter } from "@/domain/observations";
import { Measure, Observation, Property } from "@/pages/api/data";
import { DataGridPro, GridColDef, GridRow, gridClasses, useGridApiRef } from "@mui/x-data-grid-pro";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { makeStyles } from "../style-utils";

const useStyles = makeStyles()(({ palette: c, shadows: e, typography }) => ({
  dataGrid: {
    maxWidth: "100%",
    maxHeight: "100%",
    border: "1px solid",
    borderColor: c.cobalt[100],
    boxShadow: e.xxl,
    color: c.monochrome[600],
    [`& .${gridClasses.columnHeaders}`]: {
      backgroundColor: c.cobalt[50],
      borderBottom: "2px solid",
      borderColor: c.cobalt[100],
      fontWeight: typography.fontWeightRegular,
    },

    [`& .${gridClasses.columnHeader}`]: {
      ":focus-within": {
        outline: "none !important",
      },
    },
    [`& .${gridClasses.row}`]: {
      borderBottom: "2px solid",
      borderColor: c.cobalt[100],
      ":hover": {
        backgroundColor: c.cobalt[50],
      },
    },
    [`& .${gridClasses.cell}`]: {
      ":focus-within": {
        outline: "none !important",
      },
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
  const PAGE_SIZE = 50;
  const apiRef = useGridApiRef();

  const { classes } = useStyles();
  const [loadedRows, setLoadedRows] = useState<Observation[]>(observations.slice(0, PAGE_SIZE));
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    setLoadedRows(observations.slice(0, PAGE_SIZE));
  }, [observations]);

  const lastOptionElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(async (entries) => {
        const [target] = entries;
        if (target.isIntersecting && observations.length > loadedRows.length) {
          setLoadedRows(observations.slice(0, loadedRows.length + PAGE_SIZE));
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadedRows, setLoadedRows, observations]
  );

  const columns: GridColDef[] = useMemo(() => {
    return Object.values(dimensions)
      .flat()
      .sort((a, b) =>
        !dimensionsToShowSorted.hasOwnProperty(a.dimension)
          ? 1
          : !dimensionsToShowSorted.hasOwnProperty(b.dimension)
          ? -1
          : dimensionsToShowSorted[a.dimension] - dimensionsToShowSorted[b.dimension]
      )
      .map((dimension) => {
        return {
          field: isMeasure(dimension.dimension)
            ? "measure"
            : dimension.dimension === "date"
            ? "formatted-date"
            : dimension.dimension,
          headerName: dimension.label,
          headerAlign:
            isMeasure(dimension.dimension) || dimension.dimension === "date" ? "right" : "left",
          align:
            isMeasure(dimension.dimension) || dimension.dimension === "date" ? "right" : "left",
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
    <DataGridPro<Observation>
      apiRef={apiRef}
      rows={loadedRows}
      columns={columns}
      getRowId={(row) => row.observation as string}
      className={classes.dataGrid}
      rowHeight={48}
      columnHeaderHeight={48}
      disableColumnMenu
      disableColumnSelector
      disableRowSelectionOnClick
      disableColumnFilter
      autosizeOnMount
      columnBuffer={Object.keys(dimensions).length}
      hideFooter
      hideFooterPagination
      hideFooterRowCount
      onResize={() => {
        apiRef.current.autosizeColumns({
          includeHeaders: true,
          includeOutliers: true,
        });
      }}
      slots={{
        row: (props) => {
          const index = props.index;
          const lastItemIndex = loadedRows.length - 2;
          if (lastItemIndex === index) {
            return (
              <div ref={lastOptionElementRef}>
                <GridRow {...props} className="cursor-pointer"></GridRow>
              </div>
            );
          }
          return <GridRow {...props} className="cursor-pointer"></GridRow>;
        },
      }}
    />
  );
};
