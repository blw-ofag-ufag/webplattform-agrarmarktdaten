import {
  Measure,
  Property,
  dimensionsAtom,
  dimensionsStatusAtom,
  valueChainOptionsAtom,
} from "@/domain/data";
import dayjs from "dayjs";
import { Atom, atom } from "jotai";
import { atomWithHash } from "jotai-location";
import { atomFamily } from "jotai/vanilla/utils";

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
  serialize: (value?: [Option]) => (value ? value[0].value : ""),
  deserialize: (value: string) => {
    const option = options.find((o) => o.value === value);
    if (option) {
      return [option] as [Option];
    }
  },
});

export const filterWithHashAtomFamily = atomFamily(
  ({ key, options, type }: { key: Property; options: Option[]; type: "single" | "multi" }) => {
    if (type === "single" && options.length > 0) {
      return atomWithHash(key, [options[0]], optionCodec(options));
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

export type FilterConfig = {
  key: Property;
  type: "multi" | "single";
  search?: boolean;
};

export const filters: FilterConfig[] = [
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
];

export type Filters = Partial<{
  [key in Property]: {
    config: FilterConfig;
    options: Option[];
    name: string;
  };
}>;

export const valueChainSelectionAtomAtom = atom(async (get) => {
  const valueChainOptions = await get(valueChainOptionsAtom);
  return atomWithHash("valueChain", [valueChainOptions[0]], optionCodec(valueChainOptions));
});

export const productsAtom = atomWithHash("products", products, multiOptionsCodec(products));
export const timeViewAtom = atomWithHash<TimeView>("timeView", "year");
export const timeRangeAtom = atomWithHash<RangeOptions>("timeRange", timeRange);

/**
 * Atom that contains the filters specification and available options in an object.
 * This atom does not contain the selected values. Use `filtersSelectionAtomsAtom` for that.
 */
export const filtersSpecAtom = atom<Filters | Promise<Filters>>(async (get) => {
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

/**
 * Atom that contains the atoms of the selected values for each data property.
 * The atoms are created dynamically with `filterWIthHashAtomFamily` based on the filters configuration.
 * This atom does not contain the filters specification (name, options, ...), use `filtersSpecAtom` for that.
 */
export const filtersSelectionAtomsAtom = atom(async (get) => {
  const configs = await get(filtersSpecAtom);
  const filterValuesAtom: Partial<{ [key in Property]: Atom<Option[] | undefined> }> = {};

  filters.forEach((f) => {
    const filterConfig = configs[f.key];
    if (filterConfig) {
      filterValuesAtom[f.key] = filterWithHashAtomFamily({
        key: f.key,
        options: filterConfig.options,
        type: f.type,
      });
    }
  });

  return filterValuesAtom;
});
