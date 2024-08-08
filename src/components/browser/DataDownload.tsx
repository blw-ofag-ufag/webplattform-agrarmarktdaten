import { CubeDimensions, cubeDimensionsStatusAtom } from "@/domain/cubes";
import { isMeasure, tableDimensionsOrder } from "@/domain/dimensions";
import { timeViewAtom } from "@/domain/filters";
import { filteredObservationsAtom } from "@/domain/observations";
import { IcControlDownload } from "@/icons/icons-jsx/control";
import { tableFormatter } from "@/lib/formatter";
import { Observation } from "@/pages/api/data";
import { Trans, t } from "@lingui/macro";
import { timeFormat } from "d3-time-format";
import {
  Button,
  CircularProgress,
  Fade,
  ListItem,
  MenuItem,
  MenuItemProps,
  Typography,
} from "@mui/material";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { useAtomValue } from "jotai";
import PopupState, { bindMenu, bindToggle } from "material-ui-popup-state";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { isDefined, mapToObj } from "remeda";
import ActionButton from "./ActionButton";
import { sortBy } from "remeda";
import { useTheme } from "@mui/material/styles";

const FILE_FORMATS = ["csv", "xlsx", "json"] as const;
export type FileFormat = (typeof FILE_FORMATS)[number];

type DataDownloadState = {
  isDownloading: boolean;
  format?: FileFormat;
  error?: string;
};

const DataDownloadStateContext = createContext<
  [DataDownloadState, Dispatch<DataDownloadState>] | undefined
>(undefined);

export const useDataDownloadState = () => {
  const ctx = useContext(DataDownloadStateContext);

  if (ctx === undefined) {
    throw Error(
      "You need to wrap your component in <DataDownloadStateProvider /> to useDataDownloadState()"
    );
  }

  return ctx;
};

export const DataDownloadStateProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useState<DataDownloadState>({
    isDownloading: false,
  });

  return (
    <DataDownloadStateContext.Provider value={[state, dispatch]}>
      {children}
    </DataDownloadStateContext.Provider>
  );
};

export default function DataDownload() {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const filteredObservations = useAtomValue(filteredObservationsAtom);
  const dimensions = useAtomValue(cubeDimensionsStatusAtom);
  const theme = useTheme();

  return (
    <DataDownloadStateProvider>
      <PopupState variant="popover" popupId="data-download-popup">
        {(popupState) => (
          <>
            <ActionButton
              ref={anchorRef}
              sx={{
                borderRadius: "2px",
                fontSize: theme.typography.body2.fontSize,
                paddingInline: theme.spacing(4),
              }}
              startIcon={<IcControlDownload />}
              disabled={!isDefined.strict(filteredObservations) || filteredObservations.length === 0}
              {...bindToggle(popupState)}
            >
              <Trans id="data.actions.download">Data download</Trans>
            </ActionButton>
            <HoverMenu
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
              TransitionComponent={Fade}
              {...bindMenu(popupState)}
              MenuListProps={{
                sx: {
                  width: anchorRef.current?.offsetWidth,
                  border: "1px solid",
                  borderColor: "grey.300",
                },
              }}
            >
              <ClickAwayListener onClickAway={popupState.close}>
                <div>
                  <ListItem sx={{ backgroundColor: "cobalt.50", py: 3 }}>
                    <Typography variant="h5">
                      <Trans id="data.download.title">Download dataset</Trans>
                    </Typography>
                  </ListItem>

                  {dimensions.isSuccess && filteredObservations ? (
                    <div>
                      {FILE_FORMATS.map((format, i) => (
                        <DownloadMenuItem
                          key={format}
                          format={format}
                          dataset={filteredObservations}
                          dimensions={dimensions.data}
                          disableRipple
                          sx={{
                            borderBottom: i === FILE_FORMATS.length - 1 ? "none" : "1px solid",
                            borderColor: "grey.300",
                            p: 0,
                          }}
                        >
                          <Typography variant="body1">{format.toUpperCase()}</Typography>
                          <IcControlDownload width={20} height={20} />
                        </DownloadMenuItem>
                      ))}
                    </div>
                  ) : (
                    <CircularProgress />
                  )}
                </div>
              </ClickAwayListener>
            </HoverMenu>
          </>
        )}
      </PopupState>
    </DataDownloadStateProvider>
  );
}

const DownloadMenuItem = ({
  format,
  dataset,
  dimensions,
  ...props
}: {
  format: FileFormat;
  dimensions: CubeDimensions;
  dataset: Observation[];
} & MenuItemProps) => {
  const [state, dispatch] = useDataDownloadState();
  const timeView = useAtomValue(timeViewAtom);

  const download = useCallback(async () => {
    const fileName = `${t({
      id: "data.download.filename",
      message: "AMDP_data",
    })}_${timeFormat("%Y_%m_%d")(new Date())}.${format}`;

    const workbook = new Workbook();

    const worksheet = workbook.addWorksheet("data");

    const entries = Object.values({ ...dimensions.properties, ...dimensions.measures });
    const sorted = sortBy(entries, (x) => tableDimensionsOrder[x.dimension] ?? 1000);

    worksheet.columns = sorted.map(({ label, dimension }) => ({
      header: dimension === "percentage" ? `${label} (%)` : label,
      key: dimension,
    }));

    const formatters = mapToObj(Object.keys(dataset[0]), (key) => {
      const dims = isMeasure(key) ? dimensions.measures : dimensions.properties;
      const dimension = dims[key];
      return [
        key,
        dimension?.dimension
          ? tableFormatter({
              dimension: dimension.dimension,
              cubeDimensions: dims,
              timeView,
            })
          : (x: string | number | undefined) => x,
      ];
    });
    const parsedRows = dataset.map((observation) => {
      return mapToObj(Object.entries(observation), ([key, value]) => {
        const dim = isMeasure(key) ? dimensions.measures[key] : dimensions.properties[key];
        if (dim && value) {
          return [dim.dimension, formatters[key](value, { includePercent: false })];
        } else {
          return [key, value];
        }
      });
    });

    worksheet.addRows(parsedRows);

    switch (format) {
      case "csv":
        const csv = await workbook.csv.writeBuffer();
        saveAs(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" }), fileName);
        break;
      case "xlsx":
        const xlsx = await workbook.xlsx.writeBuffer();
        saveAs(
          new Blob([xlsx], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
          }),
          fileName
        );
        break;
      case "json":
        saveAs(new Blob([JSON.stringify(parsedRows)], { type: "application/json" }), fileName);
        break;
    }
  }, [format, dataset, dimensions, timeView]);

  return (
    <MenuItem key={format} {...props}>
      <Button
        variant="inverted"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          px: 3,
          py: 2,
        }}
        onClick={async () => {
          dispatch({ isDownloading: true, format });

          try {
            await download();
          } catch (e) {
            console.error("The data could not be exported.");
          } finally {
            dispatch({ ...state, isDownloading: false });
          }
        }}
      >
        <Typography variant="body1">{format.toUpperCase()}</Typography>
        {state.isDownloading && state.format === format ? (
          <CircularProgress />
        ) : (
          <IcControlDownload width={20} height={20} />
        )}
      </Button>
    </MenuItem>
  );
};
