import { atom } from "jotai";

import { weatherObserversAtom } from "./weatherObserversAtom";

// delete WeatherObservation
export const deleteWeatherObserverAtom = atom(
  null,
  (_get, set, siteId: string) => {
    set(weatherObserversAtom, prev => {
      const next = { ... prev };
      delete next[siteId];
      return next;
    });
  }
);