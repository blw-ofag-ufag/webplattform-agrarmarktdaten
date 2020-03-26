import { Betriebsgrössenkategorie, BioOderNicht } from "./type";
import { range, ascending } from "d3-array";

const betriebeOrder = {
  "< 1 ha-bio": 1,
  "< 1 ha-Nicht-bio": 2,
  "1 - 5 ha-bio": 3,
  "1 - 5 ha-Nicht-bio": 4,
  "5 - 10 ha-bio": 5,
  "5 - 10 ha-Nicht-bio": 6,
  ">10 ha-bio": 7,
  ">10 ha-Nicht-bio": 8
};

export const getBetriebeSquaresData = (betriebe: Betriebe[]) => {
  const filteredData = betriebe
    .filter(d => d.Betriebsgrössenkategorie !== "Alle")
    .filter(d => d.Kartoffeltyp !== "Beide")
    .filter(d => d["Bio"] !== "Beide")
    .map(d => ({
      BetriebsgrössenkategorieBio: `${d.Betriebsgrössenkategorie}-${d["Bio"]}`,
      ...d
    }))
    .sort((a, b) =>
      ascending(
        (betriebeOrder as any)[a.BetriebsgrössenkategorieBio],
        (betriebeOrder as any)[b.BetriebsgrössenkategorieBio]
      )
    );

  const squares: $FixMe[] = [];
  for (const element of filteredData) {
    range(0, Math.round(element["perc.alle.Betriebe"] * 100)).map(x =>
      squares.push({
        ...element,
        BetriebsgrössenkategorieBio: `${element.Betriebsgrössenkategorie}-${element["Bio"]}`
      })
    );
  }

  return squares;
};

export interface Betriebe {
  Betriebsgrössenkategorie: Betriebsgrössenkategorie;
  Kartoffeltyp: string;
  Bio: BioOderNicht;
  Anzahl: number;
  "perc.alle.Betriebe": number;
}

// export const betriebe: Betriebe[] = [
//   {
//     Betriebsgrössenkategorie: "< 1 ha",
//     Kartoffeltyp: "Frischkartoffeln",
//     Bio: "bio",
//     Anzahl: 419,
//     "perc.alle.Betriebe": 0.0923
//   },
//   {
//     Betriebsgrössenkategorie: "< 1 ha",
//     Kartoffeltyp: "Frischkartoffeln",
//     Bio: "Nicht-bio",
//     Anzahl: 1398,
//     "perc.alle.Betriebe": 0.308
//   },
//   {
//     Betriebsgrössenkategorie: "< 1 ha",
//     Kartoffeltyp: "Frischkartoffeln",
//     Bio: "Beide",
//     Anzahl: 1817,
//     "perc.alle.Betriebe": 0.4003
//   },
//   {
//     Betriebsgrössenkategorie: "1 - 5 ha",
//     Kartoffeltyp: "Frischkartoffeln",
//     Bio: "bio",
//     Anzahl: 181,
//     "perc.alle.Betriebe": 0.0399
//   },
//   {
//     Betriebsgrössenkategorie: "1 - 5 ha",
//     Kartoffeltyp: "Frischkartoffeln",
//     Bio: "Nicht-bio",
//     Anzahl: 1448,
//     "perc.alle.Betriebe": 0.319
//   },
//   {
//     Betriebsgrössenkategorie: "1 - 5 ha",
//     Kartoffeltyp: "Frischkartoffeln",
//     Bio: "Beide",
//     Anzahl: 1629,
//     "perc.alle.Betriebe": 0.3589
//   },
//   {
//     Betriebsgrössenkategorie: "5 - 10 ha",
//     Kartoffeltyp: "Frischkartoffeln",
//     Bio: "bio",
//     Anzahl: 14,
//     "perc.alle.Betriebe": 0.0031
//   },
//   {
//     Betriebsgrössenkategorie: "5 - 10 ha",
//     Kartoffeltyp: "Frischkartoffeln",
//     Bio: "Nicht-bio",
//     Anzahl: 427,
//     "perc.alle.Betriebe": 0.0941
//   },
//   {
//     Betriebsgrössenkategorie: "5 - 10 ha",
//     Kartoffeltyp: "Frischkartoffeln",
//     Bio: "Beide",
//     Anzahl: 441,
//     "perc.alle.Betriebe": 0.0972
//   },
//   {
//     Betriebsgrössenkategorie: ">10 ha",
//     Kartoffeltyp: "Frischkartoffeln",
//     Bio: "bio",
//     Anzahl: 4,
//     "perc.alle.Betriebe": 0.0009
//   },
//   {
//     Betriebsgrössenkategorie: ">10 ha",
//     Kartoffeltyp: "Frischkartoffeln",
//     Bio: "Nicht-bio",
//     Anzahl: 116,
//     "perc.alle.Betriebe": 0.0256
//   },
//   {
//     Betriebsgrössenkategorie: ">10 ha",
//     Kartoffeltyp: "Frischkartoffeln",
//     Bio: "Beide",
//     Anzahl: 120,
//     "perc.alle.Betriebe": 0.0264
//   },
//   {
//     Betriebsgrössenkategorie: "Alle",
//     Kartoffeltyp: "Frischkartoffeln",
//     Bio: "bio",
//     Anzahl: 618,
//     "perc.alle.Betriebe": 0.1362
//   },
//   {
//     Betriebsgrössenkategorie: "Alle",
//     Kartoffeltyp: "Frischkartoffeln",
//     Bio: "Nicht-bio",
//     Anzahl: 3389,
//     "perc.alle.Betriebe": 0.7466
//   },
//   {
//     Betriebsgrössenkategorie: "Alle",
//     Kartoffeltyp: "Frischkartoffeln",
//     Bio: "Beide",
//     Anzahl: 4007,
//     "perc.alle.Betriebe": 0.8828
//   },
//   {
//     Betriebsgrössenkategorie: "< 1 ha",
//     Kartoffeltyp: "Pflanzkartoffeln",
//     Bio: "bio",
//     Anzahl: 3,
//     "perc.alle.Betriebe": 0.0007
//   },
//   {
//     Betriebsgrössenkategorie: "< 1 ha",
//     Kartoffeltyp: "Pflanzkartoffeln",
//     Bio: "Nicht-bio",
//     Anzahl: 11,
//     "perc.alle.Betriebe": 0.0024
//   },
//   {
//     Betriebsgrössenkategorie: "< 1 ha",
//     Kartoffeltyp: "Pflanzkartoffeln",
//     Bio: "Beide",
//     Anzahl: 14,
//     "perc.alle.Betriebe": 0.0031
//   },
//   {
//     Betriebsgrössenkategorie: "1 - 5 ha",
//     Kartoffeltyp: "Pflanzkartoffeln",
//     Bio: "bio",
//     Anzahl: 44,
//     "perc.alle.Betriebe": 0.0097
//   },
//   {
//     Betriebsgrössenkategorie: "1 - 5 ha",
//     Kartoffeltyp: "Pflanzkartoffeln",
//     Bio: "Nicht-bio",
//     Anzahl: 435,
//     "perc.alle.Betriebe": 0.0958
//   },
//   {
//     Betriebsgrössenkategorie: "1 - 5 ha",
//     Kartoffeltyp: "Pflanzkartoffeln",
//     Bio: "Beide",
//     Anzahl: 479,
//     "perc.alle.Betriebe": 0.1055
//   },
//   {
//     Betriebsgrössenkategorie: "5 - 10 ha",
//     Kartoffeltyp: "Pflanzkartoffeln",
//     Bio: "bio",
//     Anzahl: 1,
//     "perc.alle.Betriebe": 0.0002
//   },
//   {
//     Betriebsgrössenkategorie: "5 - 10 ha",
//     Kartoffeltyp: "Pflanzkartoffeln",
//     Bio: "Nicht-bio",
//     Anzahl: 31,
//     "perc.alle.Betriebe": 0.0068
//   },
//   {
//     Betriebsgrössenkategorie: "5 - 10 ha",
//     Kartoffeltyp: "Pflanzkartoffeln",
//     Bio: "Beide",
//     Anzahl: 32,
//     "perc.alle.Betriebe": 0.007
//   },
//   {
//     Betriebsgrössenkategorie: ">10 ha",
//     Kartoffeltyp: "Pflanzkartoffeln",
//     Bio: "bio",
//     Anzahl: 0,
//     "perc.alle.Betriebe": 0
//   },
//   {
//     Betriebsgrössenkategorie: ">10 ha",
//     Kartoffeltyp: "Pflanzkartoffeln",
//     Bio: "Nicht-bio",
//     Anzahl: 7,
//     "perc.alle.Betriebe": 0.0015
//   },
//   {
//     Betriebsgrössenkategorie: ">10 ha",
//     Kartoffeltyp: "Pflanzkartoffeln",
//     Bio: "Beide",
//     Anzahl: 7,
//     "perc.alle.Betriebe": 0.0015
//   },
//   {
//     Betriebsgrössenkategorie: "Alle",
//     Kartoffeltyp: "Pflanzkartoffeln",
//     Bio: "bio",
//     Anzahl: 48,
//     "perc.alle.Betriebe": 0.0106
//   },
//   {
//     Betriebsgrössenkategorie: "Alle",
//     Kartoffeltyp: "Pflanzkartoffeln",
//     Bio: "Nicht-bio",
//     Anzahl: 484,
//     "perc.alle.Betriebe": 0.1066
//   },
//   {
//     Betriebsgrössenkategorie: "Alle",
//     Kartoffeltyp: "Pflanzkartoffeln",
//     Bio: "Beide",
//     Anzahl: 532,
//     "perc.alle.Betriebe": 0.1172
//   },
//   {
//     Betriebsgrössenkategorie: "< 1 ha",
//     Kartoffeltyp: "Beide",
//     Bio: "bio",
//     Anzahl: 422,
//     "perc.alle.Betriebe": 0.093
//   },
//   {
//     Betriebsgrössenkategorie: "< 1 ha",
//     Kartoffeltyp: "Beide",
//     Bio: "Nicht-bio",
//     Anzahl: 1409,
//     "perc.alle.Betriebe": 0.3104
//   },
//   {
//     Betriebsgrössenkategorie: "< 1 ha",
//     Kartoffeltyp: "Beide",
//     Bio: "Beide",
//     Anzahl: 1831,
//     "perc.alle.Betriebe": 0.4034
//   },
//   {
//     Betriebsgrössenkategorie: "1 - 5 ha",
//     Kartoffeltyp: "Beide",
//     Bio: "bio",
//     Anzahl: 225,
//     "perc.alle.Betriebe": 0.0496
//   },
//   {
//     Betriebsgrössenkategorie: "1 - 5 ha",
//     Kartoffeltyp: "Beide",
//     Bio: "Nicht-bio",
//     Anzahl: 1883,
//     "perc.alle.Betriebe": 0.4148
//   },
//   {
//     Betriebsgrössenkategorie: "1 - 5 ha",
//     Kartoffeltyp: "Beide",
//     Bio: "Beide",
//     Anzahl: 2108,
//     "perc.alle.Betriebe": 0.4644
//   },
//   {
//     Betriebsgrössenkategorie: "5 - 10 ha",
//     Kartoffeltyp: "Beide",
//     Bio: "bio",
//     Anzahl: 15,
//     "perc.alle.Betriebe": 0.0033
//   },
//   {
//     Betriebsgrössenkategorie: "5 - 10 ha",
//     Kartoffeltyp: "Beide",
//     Bio: "Nicht-bio",
//     Anzahl: 458,
//     "perc.alle.Betriebe": 0.1009
//   },
//   {
//     Betriebsgrössenkategorie: "5 - 10 ha",
//     Kartoffeltyp: "Beide",
//     Bio: "Beide",
//     Anzahl: 473,
//     "perc.alle.Betriebe": 0.1042
//   },
//   {
//     Betriebsgrössenkategorie: ">10 ha",
//     Kartoffeltyp: "Beide",
//     Bio: "bio",
//     Anzahl: 4,
//     "perc.alle.Betriebe": 0.0009
//   },
//   {
//     Betriebsgrössenkategorie: ">10 ha",
//     Kartoffeltyp: "Beide",
//     Bio: "Nicht-bio",
//     Anzahl: 123,
//     "perc.alle.Betriebe": 0.0271
//   },
//   {
//     Betriebsgrössenkategorie: ">10 ha",
//     Kartoffeltyp: "Beide",
//     Bio: "Beide",
//     Anzahl: 127,
//     "perc.alle.Betriebe": 0.028
//   },
//   {
//     Betriebsgrössenkategorie: "Alle",
//     Kartoffeltyp: "Beide",
//     Bio: "bio",
//     Anzahl: 666,
//     "perc.alle.Betriebe": 0.1467
//   },
//   {
//     Betriebsgrössenkategorie: "Alle",
//     Kartoffeltyp: "Beide",
//     Bio: "Nicht-bio",
//     Anzahl: 3873,
//     "perc.alle.Betriebe": 0.8533
//   },
//   {
//     Betriebsgrössenkategorie: "Alle",
//     Kartoffeltyp: "Beide",
//     Bio: "Beide",
//     Anzahl: 4539,
//     "perc.alle.Betriebe": 1
//   }
// ];
