import { atom } from "jotai";

import { activeQEAtom } from "./activeQEAtom";
import { QEType } from "../core/types";

export const qeTypeAtom = atom(
  get => get(activeQEAtom).qeType,

  (get, set, value: QEType) => {
    set(activeQEAtom, {
      ...get(activeQEAtom),
      qeType: value,
    });
  }
);
