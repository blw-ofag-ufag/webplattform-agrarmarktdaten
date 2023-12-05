import { CubeDimensions, cubeDimensionsStatusAtom } from "@/domain/cubes";
import { isMeasure } from "@/domain/dimensions";
import { timeViewAtom } from "@/domain/filters";
import { filteredObservationsAtom, valueFormatter } from "@/domain/observations";
import { IcControlDownload } from "@/icons/icons-jsx/control";
import { useLocale } from "@/lib/use-locale";
import { Observation } from "@/pages/api/data";
import { Trans, t } from "@lingui/macro";
import {
  Button,
  CircularProgress,
  Fade,
  ListItem,
  MenuItem,
  MenuItemProps,
  Typography,
} from "@mui/material";
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
import { mapToObj } from "remeda";
import ActionButton from "./ActionButton";

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

  return (
    <DataDownloadStateProvider>
      <PopupState variant="popover" popupId="data-download-popup">
        {(popupState) => (
          <>
            <ActionButton
              ref={anchorRef}
              startIcon={<IcControlDownload />}
              disabled={filteredObservations.length === 0}
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
              <ListItem
                sx={{
                  backgroundColor: "cobalt.50",
                  py: 3,
                }}
              >
                <Typography variant="h5">
                  <Trans id="data.download.title">Download dataset</Trans>
                </Typography>
              </ListItem>

              {dimensions.isSuccess ? (
                <>
                  {FILE_FORMATS.map((format, i) => (
                    <>
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
                    </>
                  ))}
                </>
              ) : (
                <CircularProgress />
              )}
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
  const locale = useLocale();

  const download = useCallback(async () => {
    const fileName = `${t({
      id: "data.download.filename",
      message: "AMDP_data",
    })}_${new Date().toLocaleString(locale)}.${format}`;

    const workbook = new Workbook();

    const worksheet = workbook.addWorksheet("data");

    worksheet.columns = Object.entries({ ...dimensions.properties, ...dimensions.measures }).map(
      ([key, value]) => ({
        header: value.label ?? key,
        key: isMeasure(value.dimension) ? "measure" : value.dimension,
      })
    );

    const parsedRows = dataset.map((observation) => {
      return mapToObj(Object.entries(observation), ([key, value]) => {
        const dimension = isMeasure(key) ? dimensions.measures[key] : dimensions.properties[key];
        if (dimension && value) {
          return [
            isMeasure(key) ? "measure" : dimension.dimension,
            valueFormatter({
              value: value,
              dimension: dimension.dimension,
              cubeDimensions: dimensions.properties,
              timeView,
            }),
          ];
        } else {
          return [key, value];
        }
      });
    });

    worksheet.addRows(parsedRows);

    switch (format) {
      case "csv":
        const csv = await workbook.csv.writeBuffer();
        saveAs(new Blob([csv], { type: "text/csv;charset=utf-8" }), fileName);
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
  }, [format, dataset, dimensions, locale]);

  return (
    <MenuItem key={format} {...props}>
      <Button
        variant="text"
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
