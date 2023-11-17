import { FlagName, FlagValue } from "./types";

const createLocalStorageAdapter = (namespace: string) => {
  const prefix = `flag__${namespace}`;
  const getKey = (name: FlagName) => `${prefix}__${name}`;

  const listFlagLocalStorage = () => {
    return Object.keys(localStorage)
      .filter((x) => x.indexOf(prefix) === 0)
      .map((x) => x.replace(prefix, ""));
  };

  const getItem = (flag: FlagName) => {
    const val = localStorage.getItem(getKey(flag));
    const parsed = val ? JSON.parse(val) : val;
    return parsed;
  };

  const setItem = (flag: FlagName, value: FlagValue) => {
    const str = JSON.stringify(value);
    return localStorage.setItem(getKey(flag), str);
  };

  const removeItem = (flag: FlagName) => {
    return localStorage.removeItem(getKey(flag));
  };

  const getAll = () => {
    const res = {} as Record<string, FlagValue>;
    listFlagLocalStorage().forEach((flag) => {
      res[flag] = getItem(flag);
    });
    return res;
  };

  const clearAll = () => {
    listFlagLocalStorage().forEach((flag) => {
      removeItem(flag);
    });
  };

  return {
    getAll,
    getItem,
    setItem,
    clearAll,
    removeItem,
  };
};

export type LocalStorageAdapter = ReturnType<typeof createLocalStorageAdapter>;

export default createLocalStorageAdapter;
