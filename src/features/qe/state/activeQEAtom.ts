import { atom } from "jotai";

import type {  QE } from "../core/types";

export const defaultQEValues = {
  count: 1,
  qeType: "TR",
} satisfies QE;

export const activeQEAtom = atom<QE>(defaultQEValues);
