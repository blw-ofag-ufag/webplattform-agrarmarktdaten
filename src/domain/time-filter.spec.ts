import { mkTimeFilter } from "./time-filter";
import { it, describe, expect } from "vitest";
import { observations } from "@/mocks/atoms.mock";

describe("time filter", () => {
  it("should filter observations between minDate and maxDate both inclusive", () => {
    for (let [minDate, maxDate, granularity, expected] of [
      [+new Date(2016, 0, 1) / 1000, +new Date(2018, 0, 1) / 1000, "month", 2] as const,
      [+new Date(2017, 4, 1) / 1000, +new Date(2018, 5, 1) / 1000, "month", 2] as const,
      [+new Date(2017, 0, 1) / 1000, +new Date(2019, 5, 1) / 1000, "year", 5] as const,
    ]) {
      const timeFilter = mkTimeFilter(minDate, maxDate, granularity);
      const filtered = observations.filter(timeFilter);
      expect(filtered.length).toBe(expected);
    }
  });
});
