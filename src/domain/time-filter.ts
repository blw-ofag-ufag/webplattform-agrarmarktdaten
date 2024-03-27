import { Observation } from "@/pages/api/data";
import dayjs from "dayjs";

/**
 * Is used to filter observations client side.
 *
 * Extracted from observations.ts due to lingui problems with vitest.
 */
export const mkTimeFilter = (
  minDateUnix: number,
  maxDateUnix: number,
  granularity: "year" | "month"
) => {
  const [minDate, maxDate] = [dayjs.unix(minDateUnix), dayjs.unix(maxDateUnix)];

  const minDateSub1 = minDate.subtract(1, granularity);
  const maxDatePlus1 = maxDate.add(1, granularity);

  const timeFilterFn = (obs: Observation) => {
    const observationDate = dayjs(obs.date);
    return (
      observationDate &&
      observationDate.isAfter(minDateSub1, granularity) &&
      observationDate.isBefore(maxDatePlus1, granularity)
    );
  };

  return timeFilterFn;
};
