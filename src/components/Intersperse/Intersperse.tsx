/**
 * Shamelessly stolen from XUI
 */
import * as React from "react";

export interface Props {
  /**
   * Separator can be either a 'ReactNode', or a function which creates a 'ReactNode'.
   * The function is given some options regarding which particular separator is being
   * created (currently only the index is provided).
   */
  separator: React.ReactNode | Separator<React.ReactNode>;

  children: React.ReactNode;
}

type Separator<T> = (options: { index: number }) => T;

function Intersperse({ separator, children }: Props) {
  const makeSeparator =
    typeof separator === "function" ? (separator as Separator<React.ReactNode>) : () => separator;
  return React.createElement(
    React.Fragment,
    {},
    ...intersperse(makeSeparator, React.Children.toArray(children))
  );
}

export default Intersperse;

function intersperse<T>(separator: Separator<T>, arr: T[]): T[] {
  if (arr.length === 0) {
    return [];
  } else {
    return arr.slice(1).reduce((xs, x, index) => xs.concat([separator({ index }), x]), [arr[0]]);
  }
}
