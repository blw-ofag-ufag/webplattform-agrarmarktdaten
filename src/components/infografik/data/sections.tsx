import { Box } from "@theme-ui/components";
import { SquareLabel } from "../square-label";
import {
  betriebsgrössenkategorie,
  betriebsgrössenkategorieBackgroundScale,
  bioColorScale,
  kartoffelTypen,
  kartoffelTypenBackgroundScale,
  kochTypen,
  kochTypenBackgroundScale
} from "./type";

export const sectionIds_flachen = new Set(["one", "two", "three", "four"]);

export type Section = $FixMe;
export const sections_flachen = {
  one: {
    title: "Alle Kartoffelarten",
    label: (
      <SquareLabel
        title="Gesamtanbaufläche Kartoffelproduktion"
        subtitle="11105 ha (100%)"
      />
    ),
    dimension: undefined,
    colorDimension: "Bio",
    backgroundDimension: undefined,
    dimensions: undefined,
    colorScale: bioColorScale,
    backgroundScale: undefined,
    bioColored: false,
    bioPrefix: "Bio-"
  },
  two: {
    title: "Alle Kartoffelarten",
    label: <Box></Box>,
    dimension: "Kartoffeltyp",
    colorDimension: "Bio",
    backgroundDimension: "Kartoffeltyp",
    dimensions: kartoffelTypen,
    colorScale: bioColorScale,
    backgroundScale: kartoffelTypenBackgroundScale,
    bioColored: false,
    bioPrefix: "Bio-"
  },

  three: {
    title: "Bio-Kartoffeln",
    label: <Box></Box>,
    dimension: "KartoffelTypBio",
    colorDimension: "Bio",
    backgroundDimension: "Kartoffeltyp",
    dimensions: kartoffelTypen,
    colorScale: bioColorScale,
    backgroundScale: kartoffelTypenBackgroundScale,
    bioColored: true,
    bioPrefix: "Bio-"
  },
  four: {
    title: "Kochtypen",
    label: <Box></Box>,
    dimension: "Kochtyp",
    colorDimension: "Bio",
    backgroundDimension: "Kochtyp",
    dimensions: kochTypen,
    colorScale: bioColorScale,
    backgroundScale: kochTypenBackgroundScale,
    bioColored: false,
    bioPrefix: "Bio-"
  }
};

export const sectionIds_betriebe = new Set(["one", "two", "three"]);
export const sections_betriebe = {
  one: {
    title: "Alle Betriebe",
    label: (
      <SquareLabel
        title=" Gesamtanzahl der Kartoffelproduzenten"
        subtitle="4539 (100%)"
      />
    ),
    dimension: undefined,
    colorDimension: "Bio",
    backgroundDimension: undefined,
    dimensions: undefined,
    colorScale: bioColorScale,
    backgroundScale: undefined,
    bioColored: false,
    bioPrefix: "Bio-betriebe: "
  },
  two: {
    title: "Alle Betriebe",
    label: <Box></Box>,
    dimension: "Betriebsgrössenkategorie",
    dimensions: betriebsgrössenkategorie,
    colorDimension: "Bio",
    backgroundDimension: "Betriebsgrössenkategorie",
    colorScale: bioColorScale,
    backgroundScale: betriebsgrössenkategorieBackgroundScale,
    bioColored: false,
    bioPrefix: "Bio-betriebe: "
  },

  three: {
    title: "Bio-Betriebe",
    label: <Box></Box>,
    dimension: "Betriebsgrössenkategorie",
    dimensions: betriebsgrössenkategorie,
    colorDimension: "Bio",
    backgroundDimension: "Betriebsgrössenkategorie",
    colorScale: bioColorScale,
    backgroundScale: betriebsgrössenkategorieBackgroundScale,
    bioColored: true,
    bioPrefix: "Bio-betriebe: "
  }
};
