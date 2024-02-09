import { RangeOptions } from "./filters";

/* Codecs to save state in URL hash */

export const multiOptionsCodec = (options: string[]) => ({
  serialize: (value: string[]) =>
    value.length === 0 ? "None" : value.length === options.length ? "All" : value.join(","),
  deserialize: (value: string) => {
    if (value === "None") return [];
    if (value === "All") return options;
    const values = value.split(",");
    const valuesOptions = options.filter((p) => values.includes(p));

    // This case covers the situation where the options have changed and the saved values are not in
    // the new options. In this case we return all the options.
    if (values.length > 0 && valuesOptions.length === 0) {
      return options;
    }

    return options.filter((p) => values.includes(p));
  },
});

export const optionCodec = (options: string[]) => ({
  serialize: (value?: string) => value ?? "",
  deserialize: (value: string) => {
    const option = options.find((o) => o === value);
    if (option) {
      return option;
    }
  },
});

export const timeRangeCodec = (defaultRange: RangeOptions["value"]) => ({
  serialize: (value: RangeOptions["value"]) => {
    if (value[0] === defaultRange[0] && value[1] === defaultRange[1]) {
      return "All";
    }
    return `${value[0]},${value[1]}`;
  },
  deserialize: (value: string): RangeOptions["value"] => {
    if (value === "All" || value === "") {
      return defaultRange;
    }
    const [min, max] = value.split(",");
    return [Number(min), Number(max)];
  },
});
