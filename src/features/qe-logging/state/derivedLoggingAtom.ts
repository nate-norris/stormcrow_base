import { atom } from "jotai";
import { QEType } from "../core/qe-types";
import { activeQEFormAtom } from "./loggingAtom";

export const dodicAtom = atom(
  get => get(activeQEFormAtom).dodic,
  (get, set, value: string) => {
    set(activeQEFormAtom, {
      ...get(activeQEFormAtom),
      dodic: value,
    });
  }
);

export const lotAtom = atom(
  get => get(activeQEFormAtom).lot,
  (get, set, value: string) => {
    set(activeQEFormAtom, {
      ...get(activeQEFormAtom),
      lot: value,
    });
  }
);

export const qeCountAtom = atom(
  get => get(activeQEFormAtom).qeCount,
  (get, set, value: number) => {
    set(activeQEFormAtom, {
      ...get(activeQEFormAtom),
      qeCount: value,
    });
  }
);

export const qeTypeAtom = atom(
  get => get(activeQEFormAtom).qeType,
  (get, set, value: QEType) => {
    set(activeQEFormAtom, {
      ...get(activeQEFormAtom),
      qeType: value,
    });
  }
);