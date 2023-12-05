import { dimensionsToShowSorted, isMeasure } from "@/domain/dimensions";
import { valueFormatter } from "@/domain/observations";
import { Measure, Observation, Property } from "@/pages/api/data";
import {
  DataGridPro,
  GridColDef,
  GridRow,
  GridSortModel,
  gridClasses,
  useGridApiRef,
} from "@mui/x-data-grid-pro";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { makeStyles } from "../style-utils";
import { useAtomValue } from "jotai";
import { timeViewAtom } from "@/domain/filters";
import { Stack, Typography } from "@mui/material";
import { Trans } from "@lingui/macro";
import dayjs from "dayjs";
import { isNumber, isString, isUndefined } from "lodash";
import { useLocale } from "@/lib/use-locale";

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
  if (isString(v1) && isString(v2)) {
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
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: "date",
      sort: "desc",
    },
  ]);
  const [loadedRows, setLoadedRows] = useState<Observation[]>(
    observations.sort((a, b) => compareDates(a.date, b.date, "desc")).slice(0, PAGE_SIZE)
  );
  const observer = useRef<IntersectionObserver>();
  const timeView = useAtomValue(timeViewAtom);

  const getObservationPage = useCallback(
    (pageSize: number) => {
      if (sortModel.length === 0 || !sortModel[0].field) {
        return observations.slice(0, pageSize);
      }
      return observations.sort((a, b) => sorter(sortModel, a, b)).slice(0, pageSize);
    },
    [observations, sortModel]
  );

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
          field: isMeasure(dimension.dimension) ? "measure" : dimension.dimension,
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
              timeView,
              locale,
            }),
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
