import { atom } from "jotai";

import { weatherObserversAtom } from "./weatherObserversAtom";
import { WeatherStatus } from "../core/models";

export const receivingSitesAtom = atom<number>((get) => {
  return Object.values(get(weatherObserversAtom))
    .filter((val) => val.status === WeatherStatus.Receiving)
    .length;
});