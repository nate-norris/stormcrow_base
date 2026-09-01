import { atom } from "jotai";
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