// Mock for atoms
// Got the values with console.log(JSON.stringify(atomValue))

import { fetchCubeDimensions } from "@/pages/api/data";
import { QueryObserverResult } from "@tanstack/react-query";

export const cubes = {
  status: "success",
  fetchStatus: "idle",
  isPending: false,
  isSuccess: true,
  isError: false,
  isInitialLoading: false,
  isLoading: false,
  data: [
    {
      cube: "cube/MilkDairyProducts/Consumption_Price_Month",
      valueChain: "value-chain/6",
      market: "market/1",
      measure: "price",
      timeView: "Month",
    },
    {
      cube: "cube/MilkDairyProducts/Consumption_Price_Year",
      valueChain: "value-chain/6",
      market: "market/1",
      measure: "price",
      timeView: "Year",
    },
    {
      cube: "cube/MilkDairyProducts/WholesaleProcessing_Price_Month",
      valueChain: "value-chain/2",
      market: "market/1",
      measure: "price",
      timeView: "Month",
    },
    {
      cube: "cube/MilkDairyProducts/WholesaleProcessing_Price_Year",
      valueChain: "value-chain/2",
      market: "market/1",
      measure: "price",
      timeView: "Year",
    },
    {
      cube: "cube/MilkDairyProducts/Production_Index_Year",
      valueChain: "value-chain/1",
      market: "market/1",
      measure: "index",
      timeView: "Year",
    },
    {
      cube: "cube/MilkDairyProducts/Production_Price_Month",
      valueChain: "value-chain/1",
      market: "market/1",
      measure: "price",
      timeView: "Month",
    },
    {
      cube: "cube/MilkDairyProducts/Production_Index_Month",
      valueChain: "value-chain/1",
      market: "market/1",
      measure: "index",
      timeView: "Month",
    },
    {
      cube: "cube/MilkDairyProducts/Production_Price_Year",
      valueChain: "value-chain/1",
      market: "market/1",
      measure: "price",
      timeView: "Year",
    },
    {
      cube: "cube/MilkDairyProducts/WholesaleProcessing_Index_Month",
      valueChain: "value-chain/2",
      market: "market/1",
      measure: "index",
      timeView: "Month",
    },
    {
      cube: "cube/MilkDairyProducts/WholesaleProcessing_Index_Year",
      valueChain: "value-chain/2",
      market: "market/1",
      measure: "index",
      timeView: "Year",
    },
    {
      cube: "cube/MilkDairyProducts/Production_Quantity_Month",
      valueChain: "value-chain/1",
      market: "market/1",
      measure: "quantity",
      timeView: "Month",
    },
    {
      cube: "cube/MilkDairyProducts/Production_Quantity_Year",
      valueChain: "value-chain/1",
      market: "market/1",
      measure: "quantity",
      timeView: "Year",
    },
  ],
  dataUpdatedAt: 1710931756572,
  error: null,
  errorUpdatedAt: 0,
  failureCount: 0,
  failureReason: null,
  errorUpdateCount: 0,
  isFetched: true,
  isFetchedAfterMount: true,
  isFetching: false,
  isRefetching: false,
  isLoadingError: false,
  isPaused: false,
  isPlaceholderData: false,
  isRefetchError: false,
  isStale: false,
};

export const timeView = "Month";

export const cubeDimensionsStatus: Exclude<
  Omit<QueryObserverResult<Awaited<ReturnType<typeof fetchCubeDimensions>>>, "refetch">,
  { data: undefined }
> = {
  status: "success",
  fetchStatus: "idle",
  isPending: false,
  isSuccess: true,
  isError: false,
  isInitialLoading: false,
  isLoading: false,
  data: {
    measures: {
      price: {
        dimension: "price",
        label: "Preis",
        range: { min: 19.045339, max: 100.667442 },
        type: "measure",
      },
    },
    properties: {
      date: {
        dimension: "date",
        label: "Datum",
        description: "Angabe des Datums für den vorliegenden Datenpunkt.",
        type: "property",
        values: [],
      },
      "cost-component": {
        dimension: "cost-component",
        label: "Kostenkomponente",
        description: "Angabe, ob Währungsangaben mit oder ohne Mehrwertsteuer sind. ",
        type: "property",
        values: [
          { value: "cost-component/0", label: "NA" },
          { value: "cost-component/1", label: "inkl. MwSt" },
          { value: "cost-component/2", label: "exkl. MwSt" },
        ],
      },
      currency: {
        dimension: "currency",
        label: "Waehrung",
        description:
          "Offizielles Zahlungsmittel mit dem ein Produkt gekauft oder verkauft wird. Währung ist nur relevant für die Kennzahl Preis.",
        type: "property",
        values: [{ value: "currency/1", label: "Rappen" }],
      },
      "data-method": {
        dimension: "data-method",
        label: "Datenart",
        description: "Methode, mit der die Daten zusammengestellt / erstellt worden sind.",
        type: "property",
        values: [
          { value: "data-method/3", label: "Richtpreis" },
          { value: "data-method/5", label: "realisierter Wert" },
        ],
      },
      "data-source": {
        dimension: "data-source",
        label: "Datenquelle",
        description: "Quelle, die bei Verwendung der Daten angegeben werden muss. ",
        type: "property",
        values: [
          { value: "data-source/1", label: "BLW, Fachbereich Marktanalysen" },
          { value: "data-source/14", label: "EU Kommission" },
          { value: "data-source/15", label: "France Agrimer" },
          { value: "data-source/35", label: "BLE Deutschland" },
          { value: "data-source/36", label: "CLAL Italien" },
          { value: "data-source/43", label: "IFE" },
          { value: "data-source/62", label: "BOM" },
          { value: "data-source/7", label: "AMA Österreich" },
        ],
      },
      "foreign-trade": {
        dimension: "foreign-trade",
        label: "Aussenhandel",
        description:
          "Richtung des Aussenhandels (Import/Export) und Angaben zu Import- resp. Exportkontingent",
        type: "property",
        values: [{ value: "foreign-trade/0", label: "NA" }],
      },
      "key-indicator-type": {
        dimension: "key-indicator-type",
        label: "Kennzahl",
        description: "Angabe der Kennzahl, die für diesen Datensatz verwendet wird.",
        type: "property",
        values: [{ value: "key-indicator-type/1", label: "Preis" }],
      },
      market: {
        dimension: "market",
        label: "Markt",
        description: "Agrar- oder Lebensmittelmarkt des Produkts.",
        type: "property",
        values: [{ value: "market/1", label: "Milch und Milchprodukte" }],
      },
      product: {
        dimension: "product",
        label: "Produkt",
        description: "Erzeugnisse oder Waren, die Gegenstand der Marktbeobachtung sind.",
        type: "property",
        values: [
          { value: "product/10", label: "Segment A" },
          { value: "product/11", label: "Richtpreis, Segment B" },
          { value: "product/12", label: "Segment B" },
          { value: "product/13", label: "Verkäste Milch (konv.)" },
          { value: "product/31", label: "ife Rohstoffwert Milch" },
          { value: "product/32", label: "Milch AT, total" },
          { value: "product/33", label: "Milch DE, total" },
          { value: "product/35", label: "Milch EU, total" },
          { value: "product/36", label: "Milch FR, total" },
          { value: "product/4", label: "Milch CH, total" },
          { value: "product/41", label: "Milch IT, total" },
          { value: "product/42", label: "Milch NZ, total" },
          { value: "product/43", label: "Milch USA, total" },
          { value: "product/45", label: "IP Suisse Wiesenmilch" },
          { value: "product/46", label: "Spot Milchpreis Italien Lodi" },
          { value: "product/5", label: "Molkereimilch (konv.)" },
          { value: "product/6", label: "Biomilch, total" },
          { value: "product/7", label: "Gewerblich verkäste Milch (konv.)" },
          { value: "product/8", label: "Konventionelle Milch, total" },
          { value: "product/9", label: "Richtpreis, Segment A" },
        ],
      },
      "product-group": {
        dimension: "product-group",
        label: "Produktgruppe",
        description:
          "In Gruppen zusammengefasste Erzeugnisse oder Waren, die Gegenstand der Marktbeobachtung sind.",
        type: "property",
        values: [{ value: "product-group/8", label: "Rohmilch" }],
      },
      "production-system": {
        dimension: "production-system",
        label: "Produktionssystem",
        description: "Anbaumethode oder Haltungsform, nach der ein Produkt hergestellt wird.",
        type: "property",
        values: [
          { value: "production-system/3", label: "konventionell" },
          { value: "production-system/0", label: "NA" },
          { value: "production-system/1", label: "Bio" },
          { value: "production-system/2", label: "IP Suisse" },
        ],
      },
      "product-origin": {
        dimension: "product-origin",
        label: "Produktherkunft",
        description: "Geografischer Raum, aus dem das Produkt stammt.",
        type: "property",
        values: [
          { value: "product-origin/1", label: "Schweiz" },
          { value: "product-origin/10", label: "Deutschland" },
          { value: "product-origin/11", label: "Frankreich" },
          { value: "product-origin/12", label: "Italien" },
          { value: "product-origin/13", label: "Österreich" },
          { value: "product-origin/23", label: "Neuseeland" },
          { value: "product-origin/26", label: "USA" },
          { value: "product-origin/3", label: "Region 1" },
          { value: "product-origin/4", label: "Region 2" },
          { value: "product-origin/5", label: "Region 3" },
          { value: "product-origin/6", label: "Region 4" },
          { value: "product-origin/7", label: "Region 5" },
          { value: "product-origin/8", label: "übrige Welt, nicht-Schweiz" },
          { value: "product-origin/9", label: "EU" },
        ],
      },
      "product-properties": {
        dimension: "product-properties",
        label: "Produkteigenschaften",
        description: "Merkmale des Produktes, die die Qualität oder den Zustand beschreiben.",
        type: "property",
        values: [{ value: "product-properties/0", label: "NA" }],
      },
      "product-subgroup": {
        dimension: "product-subgroup",
        label: "Produktuntergruppe",
        description:
          "In Untergruppen zusammengefasste Erzeugnisse oder Waren, die Gegenstand der Marktbeobachtung sind.",
        type: "property",
        values: [
          { value: "product-subgroup/23", label: "Rohmilch CH" },
          { value: "product-subgroup/24", label: "Rohmilch, International" },
        ],
      },
      "sales-region": {
        dimension: "sales-region",
        label: "Verkaufsregion",
        description: "Geografischer Raum, in dem ein Produkt verkauft wird. ",
        type: "property",
        values: [
          { value: "sales-region/0", label: "NA" },
          { value: "sales-region/1", label: "Schweiz" },
          { value: "sales-region/11", label: "EU-28" },
          { value: "sales-region/14", label: "Neuseeland" },
          { value: "sales-region/15", label: "USA" },
          { value: "sales-region/3", label: "Deutschland" },
          { value: "sales-region/4", label: "Frankreich" },
          { value: "sales-region/5", label: "Italien" },
          { value: "sales-region/6", label: "Österreich" },
        ],
      },
      unit: {
        dimension: "unit",
        label: "Einheit",
        description: "Masseinheit, die das Produkt definiert.",
        type: "property",
        values: [{ value: "unit/1", label: "kg" }],
      },
      usage: {
        dimension: "usage",
        label: "Verwendungsart",
        description: "Angabe, für welche Verwendung das Produkt vorgesehen ist.",
        type: "property",
        values: [
          { value: "usage/0", label: "NA" },
          { value: "usage/5", label: "Segment A" },
          { value: "usage/6", label: "Segment B" },
          { value: "usage/9", label: "Rohmilch nicht weiter definiert" },
        ],
      },
      "value-chain-detail": {
        dimension: "value-chain-detail",
        label: "WertschöpfungsstufeDetail",
        description: "Detailierte Angabe zur Verarbeitungs- und Handelsstufe eines Produktes.",
        type: "property",
        values: [
          { value: "value-chain-detail/1", label: "Produktion nicht weiter definiert" },
          { value: "value-chain-detail/2", label: "ab Hof (Stufe Produktion)" },
        ],
      },
      "value-chain": {
        dimension: "value-chain",
        label: "Wertschöpfungsstufe",
        description: "Vereinfachte Angabe zu Verarbeitungs- und Handelsstufe eines Produktes.",
        type: "property",
        values: [{ value: "value-chain/1", label: "Produktion" }],
      },
    },
  },
  dataUpdatedAt: 1710929916225,
  error: null,
  errorUpdatedAt: 0,
  failureCount: 0,
  failureReason: null,
  errorUpdateCount: 0,
  isFetched: true,
  isFetchedAfterMount: true,
  isFetching: false,
  isRefetching: false,
  isLoadingError: false,
  isPaused: false,
  isPlaceholderData: false,
  isRefetchError: false,
  isStale: true,
};

export const filters = {
  cube: {
    dimensions: {
      measure: {
        name: "Indikator",
        value: "price",
        options: [
          { value: "index", label: "Index" },
          { value: "price", label: "Preis" },
          { value: "quantity", label: "Menge" },
        ],
        atom: {},
        default: "price",
        isChanged: false,
      },
      market: {
        name: "Markt",
        atom: {},
        value: "market/1",
        options: [{ value: "market/1", label: "Milch und Milchprodukte" }],
        default: "market/1",
        isChanged: false,
      },
      "value-chain": {
        name: "Wertschöpfungsstufe",
        atom: {},
        value: "value-chain/1",
        options: [
          { value: "value-chain/6", label: "Konsum" },
          { value: "value-chain/1", label: "Produktion" },
          { value: "value-chain/2", label: "Grosshandel/Verarbeitung" },
        ],
        default: "value-chain/1",
        isChanged: false,
      },
    },
    time: {
      view: {
        atom: { debugLabel: "timeViewAtom" },
        value: "Month",
        default: "Year",
        isChanged: false,
      },
    },
    isLoading: false,
    isSuccess: true,
    isError: false,
  },
  dimensions: {
    dimensions: {
      product: {
        name: "Produkt",
        options: [
          {
            value: "product/10",
            label: "Segment A",
            hierarchy: {
              "product-subgroup": { value: "product-subgroup/23", label: "Rohmilch CH" },
              "product-group": { value: "product-group/8", label: "Rohmilch" },
              market: { value: "market/1", label: "Milch und Milchprodukte" },
            },
          },
          {
            value: "product/11",
            label: "Richtpreis, Segment B",
            hierarchy: {
              "product-subgroup": { value: "product-subgroup/23", label: "Rohmilch CH" },
              "product-group": { value: "product-group/8", label: "Rohmilch" },
              market: { value: "market/1", label: "Milch und Milchprodukte" },
            },
          },
          {
            value: "product/12",
            label: "Segment B",
            hierarchy: {
              "product-subgroup": { value: "product-subgroup/23", label: "Rohmilch CH" },
              "product-group": { value: "product-group/8", label: "Rohmilch" },
              market: { value: "market/1", label: "Milch und Milchprodukte" },
            },
          },
          {
            value: "product/13",
            label: "Verkäste Milch (konv.)",
            hierarchy: {
              "product-subgroup": { value: "product-subgroup/23", label: "Rohmilch CH" },
              "product-group": { value: "product-group/8", label: "Rohmilch" },
              market: { value: "market/1", label: "Milch und Milchprodukte" },
            },
          },
          {
            value: "product/31",
            label: "ife Rohstoffwert Milch",
            hierarchy: {
              "product-subgroup": {
                value: "product-subgroup/24",
                label: "Rohmilch, International",
              },
              "product-group": { value: "product-group/8", label: "Rohmilch" },
              market: { value: "market/1", label: "Milch und Milchprodukte" },
            },
          },
          {
            value: "product/32",
            label: "Milch AT, total",
            hierarchy: {
              "product-subgroup": {
                value: "product-subgroup/24",
                label: "Rohmilch, International",
              },
              "product-group": { value: "product-group/8", label: "Rohmilch" },
              market: { value: "market/1", label: "Milch und Milchprodukte" },
            },
          },
          {
            value: "product/33",
            label: "Milch DE, total",
            hierarchy: {
              "product-subgroup": {
                value: "product-subgroup/24",
                label: "Rohmilch, International",
              },
              "product-group": { value: "product-group/8", label: "Rohmilch" },
              market: { value: "market/1", label: "Milch und Milchprodukte" },
            },
          },
          {
            value: "product/35",
            label: "Milch EU, total",
            hierarchy: {
              "product-subgroup": {
                value: "product-subgroup/24",
                label: "Rohmilch, International",
              },
              "product-group": { value: "product-group/8", label: "Rohmilch" },
              market: { value: "market/1", label: "Milch und Milchprodukte" },
            },
          },
          {
            value: "product/36",
            label: "Milch FR, total",
            hierarchy: {
              "product-subgroup": {
                value: "product-subgroup/24",
                label: "Rohmilch, International",
              },
              "product-group": { value: "product-group/8", label: "Rohmilch" },
              market: { value: "market/1", label: "Milch und Milchprodukte" },
            },
          },
          {
            value: "product/4",
            label: "Milch CH, total",
            hierarchy: {
              "product-subgroup": { value: "product-subgroup/23", label: "Rohmilch CH" },
              "product-group": { value: "product-group/8", label: "Rohmilch" },
              market: { value: "market/1", label: "Milch und Milchprodukte" },
            },
          },
          {
            value: "product/41",
            label: "Milch IT, total",
            hierarchy: {
              "product-subgroup": {
                value: "product-subgroup/24",
                label: "Rohmilch, International",
              },
              "product-group": { value: "product-group/8", label: "Rohmilch" },
              market: { value: "market/1", label: "Milch und Milchprodukte" },
            },
          },
          {
            value: "product/42",
            label: "Milch NZ, total",
            hierarchy: {
              "product-subgroup": {
                value: "product-subgroup/24",
                label: "Rohmilch, International",
              },
              "product-group": { value: "product-group/8", label: "Rohmilch" },
              market: { value: "market/1", label: "Milch und Milchprodukte" },
            },
          },
          {
            value: "product/43",
            label: "Milch USA, total",
            hierarchy: {
              "product-subgroup": {
                value: "product-subgroup/24",
                label: "Rohmilch, International",
              },
              "product-group": { value: "product-group/8", label: "Rohmilch" },
              market: { value: "market/1", label: "Milch und Milchprodukte" },
            },
          },
          {
            value: "product/45",
            label: "IP Suisse Wiesenmilch",
            hierarchy: {
              "product-subgroup": { value: "product-subgroup/23", label: "Rohmilch CH" },
              "product-group": { value: "product-group/8", label: "Rohmilch" },
              market: { value: "market/1", label: "Milch und Milchprodukte" },
            },
          },
          {
            value: "product/46",
            label: "Spot Milchpreis Italien Lodi",
            hierarchy: {
              "product-subgroup": {
                value: "product-subgroup/24",
                label: "Rohmilch, International",
              },
              "product-group": { value: "product-group/8", label: "Rohmilch" },
              market: { value: "market/1", label: "Milch und Milchprodukte" },
            },
          },
          {
            value: "product/5",
            label: "Molkereimilch (konv.)",
            hierarchy: {
              "product-subgroup": { value: "product-subgroup/23", label: "Rohmilch CH" },
              "product-group": { value: "product-group/8", label: "Rohmilch" },
              market: { value: "market/1", label: "Milch und Milchprodukte" },
            },
          },
          {
            value: "product/6",
            label: "Biomilch, total",
            hierarchy: {
              "product-subgroup": { value: "product-subgroup/23", label: "Rohmilch CH" },
              "product-group": { value: "product-group/8", label: "Rohmilch" },
              market: { value: "market/1", label: "Milch und Milchprodukte" },
            },
          },
          {
            value: "product/7",
            label: "Gewerblich verkäste Milch (konv.)",
            hierarchy: {
              "product-subgroup": { value: "product-subgroup/23", label: "Rohmilch CH" },
              "product-group": { value: "product-group/8", label: "Rohmilch" },
              market: { value: "market/1", label: "Milch und Milchprodukte" },
            },
          },
          {
            value: "product/8",
            label: "Konventionelle Milch, total",
            hierarchy: {
              "product-subgroup": { value: "product-subgroup/23", label: "Rohmilch CH" },
              "product-group": { value: "product-group/8", label: "Rohmilch" },
              market: { value: "market/1", label: "Milch und Milchprodukte" },
            },
          },
          {
            value: "product/9",
            label: "Richtpreis, Segment A",
            hierarchy: {
              "product-subgroup": { value: "product-subgroup/23", label: "Rohmilch CH" },
              "product-group": { value: "product-group/8", label: "Rohmilch" },
              market: { value: "market/1", label: "Milch und Milchprodukte" },
            },
          },
        ],
        atom: {},
        value: [
          "product/10",
          "product/11",
          "product/12",
          "product/13",
          "product/31",
          "product/32",
          "product/33",
          "product/35",
          "product/36",
          "product/4",
          "product/41",
          "product/42",
          "product/43",
          "product/45",
          "product/46",
          "product/5",
          "product/6",
          "product/7",
          "product/8",
          "product/9",
        ],
        search: true,
        isChanged: false,
        groups: [null, null, null],
      },
      "value-chain-detail": {
        name: "WertschöpfungsstufeDetail",
        options: [
          {
            value: "value-chain-detail/1",
            label: "Produktion nicht weiter definiert",
            hierarchy: {
              "value-chain": { value: "value-chain/1", label: "Produktion" },
              market: {},
            },
          },
          {
            value: "value-chain-detail/2",
            label: "ab Hof (Stufe Produktion)",
            hierarchy: {
              "value-chain": { value: "value-chain/1", label: "Produktion" },
              market: {},
            },
          },
        ],
        atom: {},
        value: ["value-chain-detail/1", "value-chain-detail/2"],
        search: true,
        isChanged: false,
        groups: [null, null],
      },
      "cost-component": {
        name: "Kostenkomponente",
        options: [
          { value: "cost-component/0", label: "NA" },
          { value: "cost-component/1", label: "inkl. MwSt" },
          { value: "cost-component/2", label: "exkl. MwSt" },
        ],
        atom: {},
        value: ["cost-component/0", "cost-component/1", "cost-component/2"],
        search: true,
        isChanged: false,
      },
      currency: {
        name: "Waehrung",
        options: [{ value: "currency/1", label: "Rappen" }],
        atom: {},
        value: ["currency/1"],
        search: true,
        isChanged: false,
      },
      "foreign-trade": {
        name: "Aussenhandel",
        options: [{ value: "foreign-trade/0", label: "NA" }],
        atom: {},
        value: ["foreign-trade/0"],
        search: true,
        isChanged: false,
      },
      "data-source": {
        name: "Datenquelle",
        options: [
          { value: "data-source/1", label: "BLW, Fachbereich Marktanalysen" },
          { value: "data-source/14", label: "EU Kommission" },
          { value: "data-source/15", label: "France Agrimer" },
          { value: "data-source/35", label: "BLE Deutschland" },
          { value: "data-source/36", label: "CLAL Italien" },
          { value: "data-source/43", label: "IFE" },
          { value: "data-source/62", label: "BOM" },
          { value: "data-source/7", label: "AMA Österreich" },
        ],
        atom: {},
        value: [
          "data-source/1",
          "data-source/14",
          "data-source/15",
          "data-source/35",
          "data-source/36",
          "data-source/43",
          "data-source/62",
          "data-source/7",
        ],
        search: true,
        isChanged: false,
      },
      "sales-region": {
        name: "Verkaufsregion",
        options: [
          { value: "sales-region/0", label: "NA" },
          { value: "sales-region/1", label: "Schweiz" },
          { value: "sales-region/11", label: "EU-28" },
          { value: "sales-region/14", label: "Neuseeland" },
          { value: "sales-region/15", label: "USA" },
          { value: "sales-region/3", label: "Deutschland" },
          { value: "sales-region/4", label: "Frankreich" },
          { value: "sales-region/5", label: "Italien" },
          { value: "sales-region/6", label: "Österreich" },
        ],
        atom: {},
        value: [
          "sales-region/0",
          "sales-region/1",
          "sales-region/11",
          "sales-region/14",
          "sales-region/15",
          "sales-region/3",
          "sales-region/4",
          "sales-region/5",
          "sales-region/6",
        ],
        search: true,
        isChanged: false,
      },
      usage: {
        name: "Verwendungsart",
        options: [
          { value: "usage/0", label: "NA" },
          { value: "usage/5", label: "Segment A" },
          { value: "usage/6", label: "Segment B" },
          { value: "usage/9", label: "Rohmilch nicht weiter definiert" },
        ],
        atom: {},
        value: ["usage/0", "usage/5", "usage/6", "usage/9"],
        search: true,
        isChanged: false,
      },
      "product-origin": {
        name: "Produktherkunft",
        options: [
          { value: "product-origin/1", label: "Schweiz" },
          { value: "product-origin/10", label: "Deutschland" },
          { value: "product-origin/11", label: "Frankreich" },
          { value: "product-origin/12", label: "Italien" },
          { value: "product-origin/13", label: "Österreich" },
          { value: "product-origin/23", label: "Neuseeland" },
          { value: "product-origin/26", label: "USA" },
          { value: "product-origin/3", label: "Region 1" },
          { value: "product-origin/4", label: "Region 2" },
          { value: "product-origin/5", label: "Region 3" },
          { value: "product-origin/6", label: "Region 4" },
          { value: "product-origin/7", label: "Region 5" },
          { value: "product-origin/8", label: "übrige Welt, nicht-Schweiz" },
          { value: "product-origin/9", label: "EU" },
        ],
        atom: {},
        value: [
          "product-origin/1",
          "product-origin/10",
          "product-origin/11",
          "product-origin/12",
          "product-origin/13",
          "product-origin/23",
          "product-origin/26",
          "product-origin/3",
          "product-origin/4",
          "product-origin/5",
          "product-origin/6",
          "product-origin/7",
          "product-origin/8",
          "product-origin/9",
        ],
        search: true,
        isChanged: false,
      },
      "product-properties": {
        name: "Produkteigenschaften",
        options: [{ value: "product-properties/0", label: "NA" }],
        atom: {},
        value: ["product-properties/0"],
        search: true,
        isChanged: false,
      },
      "production-system": {
        name: "Produktionssystem",
        options: [
          { value: "production-system/3", label: "konventionell" },
          { value: "production-system/0", label: "NA" },
          { value: "production-system/1", label: "Bio" },
          { value: "production-system/2", label: "IP Suisse" },
        ],
        atom: {},
        value: [
          "production-system/3",
          "production-system/0",
          "production-system/1",
          "production-system/2",
        ],
        search: true,
        isChanged: false,
      },
      "data-method": {
        name: "Datenart",
        options: [
          { value: "data-method/3", label: "Richtpreis" },
          { value: "data-method/5", label: "realisierter Wert" },
        ],
        atom: {},
        value: ["data-method/3", "data-method/5"],
        search: true,
        isChanged: false,
      },
      unit: {
        name: "Einheit",
        options: [{ value: "unit/1", label: "kg" }],
        atom: {},
        value: ["unit/1"],
        search: true,
        isChanged: false,
      },
    },
    time: {
      range: {
        atom: {},
        value: [978303600, 1704063600],
        dataRange: [978303600, 1704063600],
        isChanged: false,
      },
    },
    isLoading: false,
    isSuccess: true,
    isError: false,
  },
  total: 10,
  changed: 0,
};
