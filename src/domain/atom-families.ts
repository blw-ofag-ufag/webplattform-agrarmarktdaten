import { atomWithHash } from "jotai-location";
import { atomFamily } from "jotai/vanilla/utils";
import { isDeepEqual } from "remeda";
import { optionCodec, multiOptionsCodec, timeRangeCodec } from "./codecs";
import { RangeOptions } from "./filters";

export const filterSingleHashAtomFamily = atomFamily(
  ({ key, options, defaultOption }: { key: string; defaultOption?: string; options: string[] }) => {
    return atomWithHash(key, defaultOption, optionCodec(options));
  },
  (a, b) => a.key === b.key && isDeepEqual(a.options, b.options)
);

export const filterMultiHashAtomFamily = atomFamily(
  ({
    key,
    options,
    defaultOptions,
  }: {
    key: string;
    options: string[];
    defaultOptions?: string[];
  }) => {
    return atomWithHash(key, defaultOptions ?? options, multiOptionsCodec(options));
  },
  (a, b) => a.key === b.key && isDeepEqual(a.options, b.options)
);

export const filterTimeRangeHashAtomFamily = atomFamily(
  ({
    key,
    value,
    defaultRange,
  }: {
    key: string;
    value: RangeOptions["value"];
    defaultRange: RangeOptions["value"];
  }) => {
    return atomWithHash(key, value ?? defaultRange, timeRangeCodec(defaultRange));
  },
  (a, b) =>
    a.key === b.key &&
    a.defaultRange[0] === b.defaultRange[0] &&
    a.defaultRange[1] === b.defaultRange[1]
);
