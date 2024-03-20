import { WritableAtom } from "jotai";
import { useHydrateAtoms } from "jotai/react/utils";

/**
 * Used in testing to hydrate atoms with initial values.
 *
 * @example <HydrateAtoms initialValue={[[atom1, atom1InitialValue], [atom2, atom2InitialValue]]}/>
 */
const HydrateAtoms = <TInitialValues extends [WritableAtom<any, any[], any>, unknown][]>({
  initialValues,
  children,
}: {
  initialValues: TInitialValues;
  children: React.ReactNode;
}) => {
  useHydrateAtoms(initialValues);
  return children;
};

export default HydrateAtoms;
