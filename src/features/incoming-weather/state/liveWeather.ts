import { atom } from 'jotai'
import type { WeatherObservation, WeatherUpdate } from "../core/models";

// primary atom of siteId to WeatherObservation
type WeatherObservers = Record<string, WeatherObservation>;
export const weatherObserversAtom = atom<WeatherObservers>({});

// Update the atom with either a new WeatherObservation or
// WeatherStatus update.
export const updateWeatherObserversAtom = atom(
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