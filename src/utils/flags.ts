import { createComponents, createHooks } from "src/flags";

export const specs = {
  /** Activates debug mode */
  debug: {},
} as const;

const keysAsValues = <R extends Record<string | number | symbol, unknown>>(record: R) =>
  Object.fromEntries(Object.keys(record).map((x) => [x, x])) as {
    [K in keyof typeof record]: K;
  };

/** Helper to access flags, provides documentation */
export const F = keysAsValues(specs);

type BlwFlag = keyof typeof F;

const flagHooks = createHooks<BlwFlag>("blw");
const { flag, useFlag, useFlags } = flagHooks;
const { FlagList } = createComponents(flagHooks);

if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.flag = flag;
  flag.initFromSearchParams(window.location.search);

  // Development flags
  if (process.env.NODE_ENV === "development") {
    flag.enable([["debug", true]]);
  }
}

export { flag, useFlag, useFlags, FlagList };
