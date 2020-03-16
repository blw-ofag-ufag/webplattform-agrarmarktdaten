import { Betriebsgrössenkategorie, BioOderNicht } from "./type";
import { range } from "d3-array";
import { flachenPerKochtyp } from "./kochtyp";

export const getFlachenSquaresData = () => {
  const squares_kartoffeltypen: $FixMe[] = [];
  for (const element of flachen_einfach) {
    range(0, Math.round(element.Percentage * 100)).map(x =>
      squares_kartoffeltypen.push(element)
    );
  }

  const squares_kochtypen: $FixMe[] = [];
  for (const element of flachenPerKochtyp) {
    range(0, Math.round(element.percentage)).map(x =>
      squares_kochtypen.push(element)
    );
  }
  const squares = squares_kartoffeltypen.map((d, i) => ({
    KartoffelTypBio: `${d.Kartoffeltyp}-${d.Bio}`,
    ...d,
    ...squares_kochtypen[i]
  }));
  return squares;
};

export interface Flachen {
  Betriebsgrössenkategorie: Betriebsgrössenkategorie;
  Kartoffeltyp: string;
  "Bio.oder.nicht": BioOderNicht;
  "Anbaufläche.pro.Betrieb": number;
  "perc.bauflache.per.kartoffeltyp": number;
  "perc.alle.Baufläche": number;
}

export interface FlachenEinfach {
  Kartoffeltyp: string;
  Bio: string;
  Anbaufläche: number;
  Percentage: number;
}
export const flachen_einfach: FlachenEinfach[] = [
  {
    Kartoffeltyp: "Frischkartoffeln",
    Bio: "Bio",
    Anbaufläche: 691,
    Percentage: 0.0622
  },
  {
    Kartoffeltyp: "Frischkartoffeln",
    Bio: "Nicht-Bio",
    Anbaufläche: 8879.7,
    Percentage: 0.7996
  },
  {
    Kartoffeltyp: "Pflanzkartoffeln",
    Bio: "Bio",
    Anbaufläche: 117.5,
    Percentage: 0.0106
  },
  {
    Kartoffeltyp: "Pflanzkartoffeln",
    Bio: "Nicht-Bio",
    Anbaufläche: 1416.5,
    Percentage: 0.1276
  }
];

export const flachen: Flachen[] = [
  {
    Betriebsgrössenkategorie: "< 1 ha",
    Kartoffeltyp: "Frischkartoffeln",
    "Bio.oder.nicht": "bio",
    "Anbaufläche.pro.Betrieb": 103.5,
    "perc.bauflache.per.kartoffeltyp": 0.0108,
    "perc.alle.Baufläche": 0.0093
  },
  {
    Betriebsgrössenkategorie: "< 1 ha",
    Kartoffeltyp: "Frischkartoffeln",
    "Bio.oder.nicht": "Nicht-bio",
    "Anbaufläche.pro.Betrieb": 399.2,
    "perc.bauflache.per.kartoffeltyp": 0.0417,
    "perc.alle.Baufläche": 0.0359
  },
  {
    Betriebsgrössenkategorie: "< 1 ha",
    Kartoffeltyp: "Frischkartoffeln",
    "Bio.oder.nicht": "Beide",
    "Anbaufläche.pro.Betrieb": 502.7,
    "perc.bauflache.per.kartoffeltyp": 0.0525,
    "perc.alle.Baufläche": 0.0453
  },
  {
    Betriebsgrössenkategorie: "1 - 5 ha",
    Kartoffeltyp: "Frischkartoffeln",
    "Bio.oder.nicht": "bio",
    "Anbaufläche.pro.Betrieb": 399.6,
    "perc.bauflache.per.kartoffeltyp": 0.0418,
    "perc.alle.Baufläche": 0.036
  },
  {
    Betriebsgrössenkategorie: "1 - 5 ha",
    Kartoffeltyp: "Frischkartoffeln",
    "Bio.oder.nicht": "Nicht-bio",
    "Anbaufläche.pro.Betrieb": 3830.8,
    "perc.bauflache.per.kartoffeltyp": 0.4003,
    "perc.alle.Baufläche": 0.345
  },
  {
    Betriebsgrössenkategorie: "1 - 5 ha",
    Kartoffeltyp: "Frischkartoffeln",
    "Bio.oder.nicht": "Beide",
    "Anbaufläche.pro.Betrieb": 4230.5,
    "perc.bauflache.per.kartoffeltyp": 0.442,
    "perc.alle.Baufläche": 0.381
  },
  {
    Betriebsgrössenkategorie: "5 - 10 ha",
    Kartoffeltyp: "Frischkartoffeln",
    "Bio.oder.nicht": "bio",
    "Anbaufläche.pro.Betrieb": 90.5,
    "perc.bauflache.per.kartoffeltyp": 0.0095,
    "perc.alle.Baufläche": 0.0081
  },
  {
    Betriebsgrössenkategorie: "5 - 10 ha",
    Kartoffeltyp: "Frischkartoffeln",
    "Bio.oder.nicht": "Nicht-bio",
    "Anbaufläche.pro.Betrieb": 2956.4,
    "perc.bauflache.per.kartoffeltyp": 0.3089,
    "perc.alle.Baufläche": 0.2662
  },
  {
    Betriebsgrössenkategorie: "5 - 10 ha",
    Kartoffeltyp: "Frischkartoffeln",
    "Bio.oder.nicht": "Beide",
    "Anbaufläche.pro.Betrieb": 3046.9,
    "perc.bauflache.per.kartoffeltyp": 0.3184,
    "perc.alle.Baufläche": 0.2744
  },
  {
    Betriebsgrössenkategorie: ">10 ha",
    Kartoffeltyp: "Frischkartoffeln",
    "Bio.oder.nicht": "bio",
    "Anbaufläche.pro.Betrieb": 97.4,
    "perc.bauflache.per.kartoffeltyp": 0.0102,
    "perc.alle.Baufläche": 0.0088
  },
  {
    Betriebsgrössenkategorie: ">10 ha",
    Kartoffeltyp: "Frischkartoffeln",
    "Bio.oder.nicht": "Nicht-bio",
    "Anbaufläche.pro.Betrieb": 1693.3,
    "perc.bauflache.per.kartoffeltyp": 0.1769,
    "perc.alle.Baufläche": 0.1525
  },
  {
    Betriebsgrössenkategorie: ">10 ha",
    Kartoffeltyp: "Frischkartoffeln",
    "Bio.oder.nicht": "Beide",
    "Anbaufläche.pro.Betrieb": 1790.8,
    "perc.bauflache.per.kartoffeltyp": 0.1871,
    "perc.alle.Baufläche": 0.1613
  },
  {
    Betriebsgrössenkategorie: "Alle",
    Kartoffeltyp: "Frischkartoffeln",
    "Bio.oder.nicht": "bio",
    "Anbaufläche.pro.Betrieb": 691,
    "perc.bauflache.per.kartoffeltyp": 0.0722,
    "perc.alle.Baufläche": 0.0622
  },
  {
    Betriebsgrössenkategorie: "Alle",
    Kartoffeltyp: "Frischkartoffeln",
    "Bio.oder.nicht": "Nicht-bio",
    "Anbaufläche.pro.Betrieb": 8879.7,
    "perc.bauflache.per.kartoffeltyp": 0.9278,
    "perc.alle.Baufläche": 0.7996
  },
  {
    Betriebsgrössenkategorie: "Alle",
    Kartoffeltyp: "Frischkartoffeln",
    "Bio.oder.nicht": "Beide",
    "Anbaufläche.pro.Betrieb": 9570.7,
    "perc.bauflache.per.kartoffeltyp": 1,
    "perc.alle.Baufläche": 0.8619
  },
  {
    Betriebsgrössenkategorie: "< 1 ha",
    Kartoffeltyp: "Pflanzkartoffeln",
    "Bio.oder.nicht": "bio",
    "Anbaufläche.pro.Betrieb": 2.6,
    "perc.bauflache.per.kartoffeltyp": 0.0017,
    "perc.alle.Baufläche": 0.0002
  },
  {
    Betriebsgrössenkategorie: "< 1 ha",
    Kartoffeltyp: "Pflanzkartoffeln",
    "Bio.oder.nicht": "Nicht-bio",
    "Anbaufläche.pro.Betrieb": 8.6,
    "perc.bauflache.per.kartoffeltyp": 0.0056,
    "perc.alle.Baufläche": 0.0008
  },
  {
    Betriebsgrössenkategorie: "< 1 ha",
    Kartoffeltyp: "Pflanzkartoffeln",
    "Bio.oder.nicht": "Beide",
    "Anbaufläche.pro.Betrieb": 11.2,
    "perc.bauflache.per.kartoffeltyp": 0.0073,
    "perc.alle.Baufläche": 0.001
  },
  {
    Betriebsgrössenkategorie: "1 - 5 ha",
    Kartoffeltyp: "Pflanzkartoffeln",
    "Bio.oder.nicht": "bio",
    "Anbaufläche.pro.Betrieb": 108.2,
    "perc.bauflache.per.kartoffeltyp": 0.0705,
    "perc.alle.Baufläche": 0.0097
  },
  {
    Betriebsgrössenkategorie: "1 - 5 ha",
    Kartoffeltyp: "Pflanzkartoffeln",
    "Bio.oder.nicht": "Nicht-bio",
    "Anbaufläche.pro.Betrieb": 1115.7,
    "perc.bauflache.per.kartoffeltyp": 0.7274,
    "perc.alle.Baufläche": 0.1005
  },
  {
    Betriebsgrössenkategorie: "1 - 5 ha",
    Kartoffeltyp: "Pflanzkartoffeln",
    "Bio.oder.nicht": "Beide",
    "Anbaufläche.pro.Betrieb": 1223.9,
    "perc.bauflache.per.kartoffeltyp": 0.7979,
    "perc.alle.Baufläche": 0.1102
  },
  {
    Betriebsgrössenkategorie: "5 - 10 ha",
    Kartoffeltyp: "Pflanzkartoffeln",
    "Bio.oder.nicht": "bio",
    "Anbaufläche.pro.Betrieb": 6.8,
    "perc.bauflache.per.kartoffeltyp": 0.0044,
    "perc.alle.Baufläche": 0.0006
  },
  {
    Betriebsgrössenkategorie: "5 - 10 ha",
    Kartoffeltyp: "Pflanzkartoffeln",
    "Bio.oder.nicht": "Nicht-bio",
    "Anbaufläche.pro.Betrieb": 206.2,
    "perc.bauflache.per.kartoffeltyp": 0.1344,
    "perc.alle.Baufläche": 0.0186
  },
  {
    Betriebsgrössenkategorie: "5 - 10 ha",
    Kartoffeltyp: "Pflanzkartoffeln",
    "Bio.oder.nicht": "Beide",
    "Anbaufläche.pro.Betrieb": 212.9,
    "perc.bauflache.per.kartoffeltyp": 0.1388,
    "perc.alle.Baufläche": 0.0192
  },
  {
    Betriebsgrössenkategorie: ">10 ha",
    Kartoffeltyp: "Pflanzkartoffeln",
    "Bio.oder.nicht": "bio",
    "Anbaufläche.pro.Betrieb": 0,
    "perc.bauflache.per.kartoffeltyp": 0,
    "perc.alle.Baufläche": 0
  },
  {
    Betriebsgrössenkategorie: ">10 ha",
    Kartoffeltyp: "Pflanzkartoffeln",
    "Bio.oder.nicht": "Nicht-bio",
    "Anbaufläche.pro.Betrieb": 86,
    "perc.bauflache.per.kartoffeltyp": 0.056,
    "perc.alle.Baufläche": 0.0077
  },
  {
    Betriebsgrössenkategorie: ">10 ha",
    Kartoffeltyp: "Pflanzkartoffeln",
    "Bio.oder.nicht": "Beide",
    "Anbaufläche.pro.Betrieb": 86,
    "perc.bauflache.per.kartoffeltyp": 0.056,
    "perc.alle.Baufläche": 0.0077
  },
  {
    Betriebsgrössenkategorie: "Alle",
    Kartoffeltyp: "Pflanzkartoffeln",
    "Bio.oder.nicht": "bio",
    "Anbaufläche.pro.Betrieb": 117.5,
    "perc.bauflache.per.kartoffeltyp": 0.0766,
    "perc.alle.Baufläche": 0.0106
  },
  {
    Betriebsgrössenkategorie: "Alle",
    Kartoffeltyp: "Pflanzkartoffeln",
    "Bio.oder.nicht": "Nicht-bio",
    "Anbaufläche.pro.Betrieb": 1416.5,
    "perc.bauflache.per.kartoffeltyp": 0.9234,
    "perc.alle.Baufläche": 0.1276
  },
  {
    Betriebsgrössenkategorie: "Alle",
    Kartoffeltyp: "Pflanzkartoffeln",
    "Bio.oder.nicht": "Beide",
    "Anbaufläche.pro.Betrieb": 1534,
    "perc.bauflache.per.kartoffeltyp": 1,
    "perc.alle.Baufläche": 0.1381
  },
  {
    Betriebsgrössenkategorie: "< 1 ha",
    Kartoffeltyp: "Beide",
    "Bio.oder.nicht": "bio",
    "Anbaufläche.pro.Betrieb": 106,
    "perc.bauflache.per.kartoffeltyp": 0.0095,
    "perc.alle.Baufläche": 0.0095
  },
  {
    Betriebsgrössenkategorie: "< 1 ha",
    Kartoffeltyp: "Beide",
    "Bio.oder.nicht": "Nicht-bio",
    "Anbaufläche.pro.Betrieb": 407.8,
    "perc.bauflache.per.kartoffeltyp": 0.0367,
    "perc.alle.Baufläche": 0.0367
  },
  {
    Betriebsgrössenkategorie: "< 1 ha",
    Kartoffeltyp: "Beide",
    "Bio.oder.nicht": "Beide",
    "Anbaufläche.pro.Betrieb": 513.8,
    "perc.bauflache.per.kartoffeltyp": 0.0463,
    "perc.alle.Baufläche": 0.0463
  },
  {
    Betriebsgrössenkategorie: "1 - 5 ha",
    Kartoffeltyp: "Beide",
    "Bio.oder.nicht": "bio",
    "Anbaufläche.pro.Betrieb": 507.8,
    "perc.bauflache.per.kartoffeltyp": 0.0457,
    "perc.alle.Baufläche": 0.0457
  },
  {
    Betriebsgrössenkategorie: "1 - 5 ha",
    Kartoffeltyp: "Beide",
    "Bio.oder.nicht": "Nicht-bio",
    "Anbaufläche.pro.Betrieb": 4946.6,
    "perc.bauflache.per.kartoffeltyp": 0.4454,
    "perc.alle.Baufläche": 0.4454
  },
  {
    Betriebsgrössenkategorie: "1 - 5 ha",
    Kartoffeltyp: "Beide",
    "Bio.oder.nicht": "Beide",
    "Anbaufläche.pro.Betrieb": 5454.3,
    "perc.bauflache.per.kartoffeltyp": 0.4912,
    "perc.alle.Baufläche": 0.4912
  },
  {
    Betriebsgrössenkategorie: "5 - 10 ha",
    Kartoffeltyp: "Beide",
    "Bio.oder.nicht": "bio",
    "Anbaufläche.pro.Betrieb": 97.2,
    "perc.bauflache.per.kartoffeltyp": 0.0088,
    "perc.alle.Baufläche": 0.0088
  },
  {
    Betriebsgrössenkategorie: "5 - 10 ha",
    Kartoffeltyp: "Beide",
    "Bio.oder.nicht": "Nicht-bio",
    "Anbaufläche.pro.Betrieb": 3162.6,
    "perc.bauflache.per.kartoffeltyp": 0.2848,
    "perc.alle.Baufläche": 0.2848
  },
  {
    Betriebsgrössenkategorie: "5 - 10 ha",
    Kartoffeltyp: "Beide",
    "Bio.oder.nicht": "Beide",
    "Anbaufläche.pro.Betrieb": 3259.8,
    "perc.bauflache.per.kartoffeltyp": 0.2936,
    "perc.alle.Baufläche": 0.2936
  },
  {
    Betriebsgrössenkategorie: ">10 ha",
    Kartoffeltyp: "Beide",
    "Bio.oder.nicht": "bio",
    "Anbaufläche.pro.Betrieb": 97.4,
    "perc.bauflache.per.kartoffeltyp": 0.0088,
    "perc.alle.Baufläche": 0.0088
  },
  {
    Betriebsgrössenkategorie: ">10 ha",
    Kartoffeltyp: "Beide",
    "Bio.oder.nicht": "Nicht-bio",
    "Anbaufläche.pro.Betrieb": 1779.3,
    "perc.bauflache.per.kartoffeltyp": 0.1602,
    "perc.alle.Baufläche": 0.1602
  },
  {
    Betriebsgrössenkategorie: ">10 ha",
    Kartoffeltyp: "Beide",
    "Bio.oder.nicht": "Beide",
    "Anbaufläche.pro.Betrieb": 1876.7,
    "perc.bauflache.per.kartoffeltyp": 0.169,
    "perc.alle.Baufläche": 0.169
  },
  {
    Betriebsgrössenkategorie: "Alle",
    Kartoffeltyp: "Beide",
    "Bio.oder.nicht": "bio",
    "Anbaufläche.pro.Betrieb": 808.5,
    "perc.bauflache.per.kartoffeltyp": 0.0728,
    "perc.alle.Baufläche": 0.0728
  },
  {
    Betriebsgrössenkategorie: "Alle",
    Kartoffeltyp: "Beide",
    "Bio.oder.nicht": "Nicht-bio",
    "Anbaufläche.pro.Betrieb": 10296.2,
    "perc.bauflache.per.kartoffeltyp": 0.9272,
    "perc.alle.Baufläche": 0.9272
  },
  {
    Betriebsgrössenkategorie: "Alle",
    Kartoffeltyp: "Beide",
    "Bio.oder.nicht": "Beide",
    "Anbaufläche.pro.Betrieb": 11104.7,
    "perc.bauflache.per.kartoffeltyp": 1,
    "perc.alle.Baufläche": 1
  }
];
