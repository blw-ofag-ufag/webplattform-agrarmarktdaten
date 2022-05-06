import { scaleOrdinal } from "d3";

import { colors } from "@/components/infografik/colors";

export type BioOderNicht = "bio" | "Nicht-bio" | "Beide";
export const bioOderNicht: BioOderNicht[] = ["bio", "Nicht-bio"];

// Bio / Nicht-bio
export const bioTypes = ["bio", "Nicht-bio"];
export const bioColors = [colors.green, colors.brown];
export const bioColorScale = scaleOrdinal<string>()
  .domain(bioTypes)
  .range(bioColors);
export const bioOpacityScale = scaleOrdinal<number>()
  .domain(bioTypes)
  .range([1, 0.5]);

// Gradients
const backgroundRange = ["one", "two", "three", "four", "five"];
export const backgroundStyle = (color: string) => {
  return {
    one: {
      backgroundColor: color,
      border: `2px solid ${color}`,
      backgroundImage: "none",
      backgroundSize: "none",
    },
    two: {
      backgroundColor: color,
      border: `2px solid ${color}`,
      backgroundImage: `linear-gradient(135deg, ${color} 33.33%, #f1d58f 33.33%, #f1d58f 50%, ${color} 50%, ${color} 83.33%, #f1d58f 83.33%, #f1d58f 100%)`,
      backgroundSize: "12.73px 12.73px",
    },
    three: {
      backgroundColor: color,
      border: `2px solid ${color}`,
      backgroundImage: `radial-gradient(${colors.yellow} 20%, transparent 0),
      radial-gradient(${colors.yellow} 20%, transparent 0)`,
      backgroundSize: "16px 16px",
      backgroundPosition: "4px 4px, 12px 12px",
    },
    // four: {
    //   backgroundColor: color,
    //   border: `1px solid ${color}`,
    //   backgroundImage: `linear-gradient(135deg, ${color}16.67%, #f1d58f 16.67%, #f1d58f 50%, ${color}50%, ${color}66.67%, #f1d58f 66.67%, #f1d58f 100%)`,
    //   backgroundSize: "12.73px 12.73px"
    // },
    four: {
      backgroundColor: "none",
      border: `2px solid ${color}`,
      backgroundImage: "none",
      backgroundSize: "none",
    },
  };
};

// Flächenstruktur
export type KartoffelTyp = "Frischkartoffeln" | "Pflanzkartoffeln";
export const kartoffelTypen: KartoffelTyp[] = [
  "Frischkartoffeln",
  "Pflanzkartoffeln",
];

export type KartoffelTypBio =
  | "Frischkartoffeln-Bio"
  | "Frischkartoffeln-Nicht-Bio"
  | "Pflanzkartoffeln-Bio"
  | "Pflanzkartoffeln-Nicht-Bio";
export const kartoffelTypenBio: KartoffelTypBio[] = [
  "Frischkartoffeln-Bio",
  "Frischkartoffeln-Nicht-Bio",
  "Pflanzkartoffeln-Bio",
  "Pflanzkartoffeln-Nicht-Bio",
];

export type KochTyp =
  | "Festkochend"
  | "Mehligkochend"
  | "Frites"
  | "Chips"
  | "Diverse";

export const kochTypen: KochTyp[] = [
  "Festkochend",
  "Mehligkochend",
  "Frites",
  "Chips",
  // "Diverse"
];

// Betriebsstruktur
export type Betriebsgrössenkategorie =
  | "< 1 ha"
  | "1 - 5 ha"
  | "5 - 10 ha"
  | ">10 ha"
  | "Alle";
export const betriebsgrössenkategorie: Betriebsgrössenkategorie[] = [
  "< 1 ha",
  "1 - 5 ha",
  "5 - 10 ha",
  ">10 ha",
];
export const betriebsgrössenkategorieBio = [
  "< 1 ha-bio",
  "< 1 ha-Nicht-bio",
  "1 - 5 ha-bio",
  "1 - 5 ha-Nicht-bio",
  "5 - 10 ha-bio",
  "5 - 10 ha-Nicht-bio",
  ">10 ha-bio",
  ">10 ha-Nicht-bio",
];

// Gradient scales
export const kartoffelTypenBackgroundScale = scaleOrdinal()
  .domain(kartoffelTypen)
  .range(backgroundRange);
export const kartoffelTypenBioBackgroundScale = scaleOrdinal()
  .domain(kartoffelTypenBio)
  .range(backgroundRange);
export const kochTypenBackgroundScale = scaleOrdinal()
  .domain(kochTypen)
  .range(backgroundRange);
export const betriebsgrössenkategorieBackgroundScale = scaleOrdinal()
  .domain(betriebsgrössenkategorie)
  .range(backgroundRange);
