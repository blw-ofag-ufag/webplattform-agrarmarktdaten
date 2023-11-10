import { atomFamily } from "jotai/vanilla/utils";
import { Measure, Property, dimensionsAtom, dimensionsStatusAtom } from "@/domain/data";
import { atomWithHash } from "jotai-location";
import { Atom, atom } from "jotai";
import dayjs from "dayjs";

export type Option = {
  label: string;
  value: string;
  checked?: boolean;
} & { [key: string]: string };

export const markets: Option[] = [
  {
    label: "Milk and Dairy",
    value: "MilkDairyProducts",
  },
];

export type IndicatorOption = Option & {
  dimensionIri: string;
  key: Measure;
};

export const indicators: IndicatorOption[] = [
  {
    label: "Price",
    value: "Price",
    dimensionIri: "<https://agriculture.ld.admin.ch/foag/measure/price>",
    key: "price",
  },
  {
    label: "Quantity",
    value: "Quantity",
    dimensionIri: "<https://agriculture.ld.admin.ch/foag/measure/quantity>",
    key: "quantity",
  },
  {
    label: "Index",
    value: "Index",
    dimensionIri: "<https://agriculture.ld.admin.ch/foag/measure/index>",
    key: "index",
  },
];

/*  Placeholder value */
export const products: Option[] = [
  {
    market: "Egg Products",
    marketSlug: "eggs",
    label: "Hatching eggs",
    value: "hatchingeggs",
    group: "eggs",
    subgroup: "hatchingeggs",
  },
  {
    market: "Egg Products",
    marketSlug: "eggs",
    label: "Hatchings NWD",
    value: "hatchingeggs-nwd",
    group: "eggs",
    subgroup: "hatchingeggs",
  },
  {
    market: "Egg Products",
    marketSlug: "eggs",
    label: "Eggs < 50",
    value: "eggs<50",
    group: "eggs",
  },
  {
    market: "Milk & Dairy Products",
    marketSlug: "milk",
    label: "Brie Camembert",
    value: "brie",
    group: "milk",
    subgroup: "cheese",
  },
  {
    market: "Milk & Dairy Products",
    marketSlug: "milk",
    label: "Emmentaler",
    value: "emmentaler",
    group: "milk",
    subgroup: "cheese",
  },
];

/* Codecs */

const multiOptionsCodec = <T extends Option>(options: T[]) => ({
  serialize: (value: Option[]) => value.map((v) => v.value).join(","),
  deserialize: (value: string) => {
    const values = value.split(",");
    return options.filter((p) => values.includes(p.value));
  },
});

const optionCodec = <T extends Option>(options: T[]) => ({
  serialize: (value?: Option) => (value ? value.value : ""),
  deserialize: (value: string) => options.find((o) => o.value === value),
});

export const filterAtomFamily = atomFamily(
  ({ key, options, type }: { key: Property; options: Option[]; type: "single" | "multi" }) => {
    if (type === "single" && options.length > 0) {
      return atomWithHash(key, options[0], optionCodec(options));
    } else {
      return atomWithHash(key, options, multiOptionsCodec(options));
    }
  },
  (a, b) => a.key === b.key
);

/* Time  */

export type RangeOptions = {
  min: number;
  max: number;
  value: [number, number];
};

export type TimeView = "year" | "month";

const MIN_DATE = dayjs("2020-01");
const MAX_DATE = dayjs("2023-01");

export const timeRange = {
  min: MIN_DATE.unix(),
  max: MAX_DATE.unix(),
  value: [MIN_DATE.unix(), MAX_DATE.unix()] as [number, number],
};

/* Atoms */

export const indicatorAtom = atomWithHash("indicator", indicators[0], optionCodec(indicators));

export const productsAtom = atomWithHash("products", products, multiOptionsCodec(products));
export const timeViewAtom = atomWithHash<TimeView>("timeView", "year");
export const timeRangeAtom = atomWithHash<RangeOptions>("timeRange", timeRange);

export type FilterConfig = { key: Property; type: "multi" | "single"; search: boolean };
export const filters: FilterConfig[] = [
  {
    key: "market",
    type: "multi",
    search: false,
  },
  {
    key: "salesRegion",
    type: "multi",
    search: true,
  },
  {
    key: "productionSystem",
    type: "multi",
    search: false,
  },
  {
    key: "valueChain",
    type: "multi",
    search: false,
  },
];

export type Filters = Partial<{
  [key in Property]: {
    config: FilterConfig;
    options: Option[];
    name: string;
  };
}>;

export const filterAtom = atom<Filters | Promise<Filters>>(async (get) => {
  const dimensions = await get(dimensionsAtom);
  const dimensionStatus = get(dimensionsStatusAtom);

  const filtersMap: Filters = {};

  if (dimensionStatus.isSuccess) {
    filters.forEach((filter) => {
      const dim = dimensions.property.find((d) => d.key === filter.key);
      if (dim) {
        filtersMap[filter.key] = {
          config: filter,
          options: dim.values.map((v) => ({
            label: v.name,
            value: v.iri,
          })),
          name: dim.name,
        };
      }
    });
  }
  return filtersMap;
});

export const filtersValuesHashAtomsAtom = atom(async (get) => {
  const configs = await get(filterAtom);
  const filterValuesAtom: Partial<{ [key in Property]: Atom<$FixMe> }> = {};

  filters.forEach((f) => {
    const filterConfig = configs[f.key];
    if (filterConfig) {
      const a = filterAtomFamily({ key: f.key, options: filterConfig.options, type: f.type });
      filterValuesAtom[f.key] = a;
    }
  });

  return filterValuesAtom;
});
