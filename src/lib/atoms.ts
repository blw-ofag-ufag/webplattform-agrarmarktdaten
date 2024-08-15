import { atom } from "jotai";

/**
 * Max number of sections in a page
 */
export const maxSectionsAtom = atom(0);

/**
 * Index of the h1 title in focus (valid values start with index 1)
 */
export const focusSectionAtom = atom(0);
