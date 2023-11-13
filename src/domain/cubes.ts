import { fetchCubes } from "@/pages/api/data";
import { atom } from "jotai";
import { atomsWithQuery } from "jotai-tanstack-query";
import { filterCubeSelectionAtom, timeViewAtom } from "./filters";

export const [cubesAtom, cubesStatusAtom] = atomsWithQuery(() => ({
  queryKey: ["cubes"],
  queryFn: () => fetchCubes(),
}));

export const defaultCube = "cube/MilkDairyProducts/Consumption_Price_Year";

export const cubePathAtom = atom(async (get) => {
  const allCubes = await get(cubesAtom);
  const filterCubeSelection = await get(filterCubeSelectionAtom);

  const cubePath = allCubes.find(
    (cube) =>
      cube.valueChain === get(filterCubeSelection["value-chain"])?.value &&
      cube.market === get(filterCubeSelection.market)?.value &&
      cube.measure === get(filterCubeSelection.measure)?.value &&
      cube.timeView === get(timeViewAtom)
  );
  return cubePath?.cube || defaultCube;
});
