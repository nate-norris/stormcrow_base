import { atom } from "jotai";

import { weatherObserversAtom } from "./weatherObserversAtom";
import type { WeatherUpdate } from "../core/models";

// Update the atom with either a new WeatherObservation or
// WeatherStatus update.
export const updateWeatherObserverAtom = atom(
  null,
  (_get, set, update: WeatherUpdate) => {
    set(weatherObserversAtom, prev => {
      switch (update.type) {
        // new observation
        case "observation":
          return {
            ...prev,
            [update.data.siteId]: update.data,
          };

        // status update 
        case "status": {
          const existing = prev[update.siteId];
          if (!existing) return prev; // no update needed

          return {
            ...prev,
            [update.siteId]: {
              ...existing,
              status: update.status,
            },
          };
        }

        default:
          return prev;
      }
    });
  }
);