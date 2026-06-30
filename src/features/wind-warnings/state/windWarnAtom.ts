import { atom } from "jotai";
import type { WindWarningConfig } from "../core/models";

const defaultWindWarningConfig: WindWarningConfig = {
  id: -1,
  maxWind: 0,
  thresholdPercent: 0,
  gunOrient: 0,
  expectedSites: 0,
};
export const activeWindConfigAtom = atom<WindWarningConfig>(defaultWindWarningConfig);

// confirm a WindWarningConfig for a selected test has been loaded
export const hasLoadedWindConfigAtom= atom((get) => {
  return get(activeWindConfigAtom).id !== -1;
});