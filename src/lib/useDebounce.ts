import { useDebounceValue } from "usehooks-ts";
import { useQueryState, parseAsString } from "next-usequerystate";

// SOURCE: https://usehooks-ts.com/react-hook/use-debounce
import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay?: number): [T, (value: T) => void] {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return [debouncedValue, setDebouncedValue];
}

/**
 * Debounces a string query state value. Useful for search queries that keep a query param
 */
export function useDebounceQueryStateString(
  value: string,
  delay?: number
): [string, string, (value: string) => void] {
  const [searchString, setSearchString] = useQueryState("search", parseAsString.withDefault(value));
  const [debouncedValue, setDebouncedValue] = useDebounceValue(value, delay || 500);

  useEffect(() => {
    setDebouncedValue(searchString);
  }, [setDebouncedValue, searchString]);

  return [searchString, debouncedValue, (x: string) => setSearchString(x)];
}
