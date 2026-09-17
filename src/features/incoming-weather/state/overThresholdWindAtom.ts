import { atom } from "jotai";

import { weatherObserversAtom } from "./weatherObserversAtom";
import { WindState } from "../core/models";

export const overThresholdWindAtom = atom<number>((get) => {
  return Object.values(get(weatherObserversAtom))
    .filter((val) => val.windState === WindState.Warn)
    .length;
});