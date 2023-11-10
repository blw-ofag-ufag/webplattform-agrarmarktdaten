import { Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAtomValue } from "jotai";
import { cubesAtom } from "./cubes";
import { CubeSpec } from "@/pages/api/data";

export const AvailableCubes = () => {
  const cubes = useAtomValue(cubesAtom);
  const columns: Array<GridColDef & { field: keyof CubeSpec }> = [
    { field: "cube", headerName: "Cube", editable: false },
    { field: "valueChain", headerName: "Cube", editable: false },
    { field: "market", headerName: "Cube", editable: false },
    { field: "timeView", headerName: "Time View", editable: false },
  ];

  return (
    <>
      <Typography variant="h1">Available Cubes</Typography>
      <DataGrid rows={cubes} columns={columns} autoHeight={true} />
    </>
  );
};

export default {
  component: AvailableCubes,
};
