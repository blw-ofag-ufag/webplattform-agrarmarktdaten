import { amdpMeasure } from "@/lib/namespace";
import { Locale, locales } from "@/locales/locales";
import { CubeSpec, fetchCubeDimensions, fetchObservations } from "@/pages/api/data";
import {
  CircularProgress,
  FormControlLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useMemo, useState } from "react";
import ReactJson from "react-json-view";
import { cubesAtom, defaultCube } from "./cubes";
import { baseDimensionsAtom } from "./dimensions";
import { valueFormatter } from "./observations";

export const AvailableCubes = () => {
  const cubes = useAtomValue(cubesAtom);
  const columns: Array<GridColDef & { field: keyof CubeSpec }> = [
    { field: "cube", headerName: "Cube", editable: false, width: 300 },
    { field: "valueChain", headerName: "Value Chain", editable: false, width: 150 },
    { field: "market", headerName: "Market", editable: false, width: 150 },
    { field: "measure", headerName: "Measure", editable: false, width: 150 },
    { field: "timeView", headerName: "Time View", editable: false, width: 150 },
  ];

  return (
    <Stack gap={2}>
      <Typography variant="h2">Available Cubes</Typography>
      <DataGrid rows={cubes} getRowId={(row) => row.cube} columns={columns} autoHeight={true} />
    </Stack>
  );
};

export const BaseDimensions = () => {
  const baseDimensions = useAtomValue(baseDimensionsAtom);

  return (
    <Stack gap={2}>
      <Typography variant="h2">Base Dimensions</Typography>
      <ReactJson src={baseDimensions} />
    </Stack>
  );
};

export const CubeDimensions = () => {
  const [cube, setCube] = useState<string>(defaultCube);
  const [locale, setLocale] = useState<Locale>("de");
  const cubes = useAtomValue(cubesAtom);

  const dimensions = useQuery({
    queryKey: ["dimensions", cube, locale],
    queryFn: () => fetchCubeDimensions(locale, cube),
  });

  return (
    <Stack gap={2}>
      <Typography variant="h2">Cube Dimensions</Typography>
      <Select label="Cube" value={cube} onChange={(e) => setCube(e.target.value)}>
        {cubes.map((c) => (
          <MenuItem key={c.cube} value={c.cube}>
            {c.cube}
          </MenuItem>
        ))}
      </Select>
      <Select label="Language" value={locale} onChange={(e) => setLocale(e.target.value as Locale)}>
        {locales.map((l) => (
          <MenuItem key={l} value={l}>
            {l.toUpperCase()}
          </MenuItem>
        ))}
      </Select>
      {dimensions.isLoading && <CircularProgress />}
      {dimensions.isSuccess && <ReactJson src={dimensions.data} />}
    </Stack>
  );
};

export const Observations = () => {
  const [cube, setCube] = useState<string>(defaultCube);
  const [showParsed, setShowParsed] = useState(false);
  const cubes = useAtomValue(cubesAtom);
  const cubeDef = cubes.find((c) => c.cube === cube);

  const observations = useQuery({
    queryKey: ["observations", cube],
    queryFn: () =>
      fetchObservations({
        cubeIri: cube,
        filters: {},
        measure: {
          iri: amdpMeasure(cubeDef?.measure).value,
          key: cubeDef?.measure ?? "measure",
        },
      }),
  });

  const dimensions = useQuery({
    queryKey: ["dimensions", cube],
    queryFn: () => fetchCubeDimensions("de", cube),
  });

  const columns: GridColDef[] = useMemo(() => {
    if (!observations.data || observations.data.length === 0) {
      return [];
    }

    return Object.entries(observations.data[0]).map(([key]) => {
      return {
        field: key,
        headerName: key,
        width: 200,
        valueFormatter: (params) => {
          if (dimensions.data && showParsed) {
            return valueFormatter({
              value: params.value,
              dimension: key,
              cubeDimensions: dimensions.data,
            });
          }
          return params.value;
        },
      };
    });
  }, [observations.data, dimensions.data, showParsed]);

  return (
    <Stack gap={2}>
      <Typography variant="h2">Cube Observations</Typography>
      <Select label="Cube" value={cube} onChange={(e) => setCube(e.target.value)}>
        {cubes.map((c) => (
          <MenuItem key={c.cube} value={c.cube}>
            {c.cube}
          </MenuItem>
        ))}
      </Select>
      <FormControlLabel
        sx={{
          ml: 1,
        }}
        control={
          <Switch
            defaultChecked
            checked={showParsed}
            onChange={(e) => setShowParsed(e.target.checked)}
          />
        }
        label="Show parsed"
      />
      {observations.isLoading && <CircularProgress />}
      {observations.isSuccess && observations.data && (
        <DataGrid
          rows={observations.data}
          getRowId={(row) => row.observation}
          columns={columns}
          autoHeight
        />
      )}
    </Stack>
  );
};

export default {
  component: BaseDimensions,
  title: "Domain / Data",
};
