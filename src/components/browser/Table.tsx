import { tableDimensionsOrder, isMeasure } from "@/domain/dimensions";
import { timeViewAtom } from "@/domain/filters";
import { tableFormatter } from "@/lib/formatter";
import { useLocale } from "@/lib/use-locale";
import { Measure, Observation, Property } from "@/pages/api/data";
import { Trans } from "@lingui/macro";
import { Stack, Typography } from "@mui/material";
import {
  DataGridPro,
  GridColDef,
  GridRow,
  GridSortModel,
  gridClasses,
  useGridApiRef,
} from "@mui/x-data-grid-pro";
import dayjs from "dayjs";
import { useAtomValue } from "jotai";
import { isNumber, isString, isUndefined } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { makeStyles } from "../style-utils";
import React from "react";
import { sortBy } from "remeda";

const useStyles = makeStyles()(({ palette: c, shadows: e, typography }) => ({
  dataGrid: {
    maxWidth: "100%",
    maxHeight: "100%",
    border: "1px solid",
    borderColor: c.cobalt[100],
    boxShadow: e.xxl,
    color: c.monochrome[600],
    ...typography.body3,
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

const compareDates = (
  date1?: string | number,
  date2?: string | number,
  direction: "asc" | "desc" = "asc"
) => {
  const compare = dayjs(date1).isAfter(dayjs(date2)) ? 1 : -1;
  return direction === "asc" ? compare : compare * -1;
};

const sorter = (sortModel: GridSortModel, obs1: Observation, obs2: Observation) => {
  const v1 = obs1[sortModel[0].field as keyof Observation];
  const v2 = obs2[sortModel[0].field as keyof Observation];

  let compare = 0;

  if (sortModel[0].field === "date") {
    compare = compareDates(v1, v2);
  }
  if (isNumber(v1) && isNumber(v2)) {
    compare = v1 - v2;
  }
  if (sortModel[0].field !== "date" && isString(v1) && isString(v2)) {
    compare = v1.localeCompare(v2);
  }
  if (!isUndefined(v1) && isUndefined(v2)) {
    compare = 1;
  }
  if (isUndefined(v1) && !isUndefined(v2)) {
    compare = -1;
  }
  return sortModel[0].sort === "asc" ? compare : compare * -1;
};

const DEFAULT_SORT_MODEL: GridSortModel = [
  {
    field: "date",
    sort: "desc",
  },
];

export const Table = ({
  observations,
  dimensions,
}: {
  observations: Observation[];
  dimensions: Record<string, Property | Measure>;
}) => {
  const PAGE_SIZE = 50;
  const apiRef = useGridApiRef();
  const locale = useLocale();

  const { classes } = useStyles();
  const [sortModel, setSortModel] = useState<GridSortModel>(DEFAULT_SORT_MODEL);

  const getObservationPage = useCallback(
    (pageSize: number) => {
      const model =
        sortModel.length === 0 || !sortModel[0].field
          ? [
              {
                field: "date",
                sort: "desc" as const,
              },
            ]
          : sortModel;

      return observations.sort((a, b) => sorter(model, a, b)).slice(0, pageSize);
    },
    [observations, sortModel]
  );

  const [loadedRows, setLoadedRows] = useState<Observation[]>(getObservationPage(PAGE_SIZE));
  const observer = useRef<IntersectionObserver>();
  const timeView = useAtomValue(timeViewAtom);

  useEffect(() => {
    setLoadedRows(getObservationPage(PAGE_SIZE));
  }, [getObservationPage]);

  const lastOptionElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(async (entries) => {
        const [target] = entries;
        if (target.isIntersecting && observations.length > loadedRows.length) {
          setLoadedRows(getObservationPage(loadedRows.length + PAGE_SIZE));
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadedRows, setLoadedRows, getObservationPage, observations]
  );

  const columns: GridColDef[] = useMemo(() => {
    const sorted = sortBy(
      Object.values(dimensions),
      (x) => tableDimensionsOrder[x.dimension] ?? 1000
    );
    return sorted.map((dimension) => {
      const formatter = tableFormatter({
        dimension: dimension.dimension,
        cubeDimensions: dimensions,
        timeView,
        locale,
      });
      return {
        field: isMeasure(dimension.dimension) ? "measure" : dimension.dimension,
        headerName: dimension.label,
        headerAlign:
          isMeasure(dimension.dimension) || dimension.dimension === "date" ? "right" : "left",
        align: isMeasure(dimension.dimension) || dimension.dimension === "date" ? "right" : "left",
        sortingOrder: ["desc", "asc", null],
        minWidth: 100,
        valueFormatter: (params) => formatter(params.value),
      };
    });
  }, [dimensions, timeView, locale]);

  return (
    <DataGridPro<Observation>
      apiRef={apiRef}
      rows={loadedRows}
      sortModel={sortModel}
      onSortModelChange={(model) => {
        setSortModel(model);
        apiRef.current.scrollToIndexes({
          rowIndex: 0,
        });
      }}
      sortingMode="server"
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
        noRowsOverlay: () => (
          <Stack height="100%" justifyContent="center" alignItems="center">
            <Typography variant="body2">
              <Trans id="data.table.empty">No data</Trans>
            </Typography>
          </Stack>
        ),
        row: (props) => {
          const index = props.index;
          const lastItemIndex = loadedRows.length - 2;
          if (lastItemIndex === index) {
            return <GridRow {...props} ref={lastOptionElementRef} className="cursor-pointer" />;
          }
          return <GridRow {...props} className="cursor-pointer" />;
        },
      }}
    />
  );
};

export type TableProps = React.ComponentProps<typeof Table>;
