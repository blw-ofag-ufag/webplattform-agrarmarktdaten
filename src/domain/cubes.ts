import { fetchCubes } from "@/pages/api/data";
import { atomsWithQuery } from "jotai-tanstack-query";

export const [cubesAtom, cubesStatusAtom] = atomsWithQuery(() => ({
  queryKey: ["cubes"],
  queryFn: () => fetchCubes(),
}));
