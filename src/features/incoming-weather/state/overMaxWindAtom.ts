import { atom } from "jotai";

import { weatherObserversAtom } from "./weatherObserversAtom";
import { WindState } from "../core/models";

export const overMaxWindAtom = atom<number>((get) => {
  return Object.values(get(weatherObserversAtom))
    .filter((val) => val.windState === WindState.Critical)
    .length;
});