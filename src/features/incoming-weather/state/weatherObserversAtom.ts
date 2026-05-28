import { atom, Atom } from "jotai";
import { atomFamily } from "jotai/utils";

import { WeatherObservation, WeatherUpdate } from "../core/models";
import { mockData } from "./mockWeather";

// set if Vite .env is set to use mock weather
const useMock =
  (import.meta.env.VITE_USE_MOCK_WEATHER ?? "false") === "true";
// pull initial mocked weather if present
const initialWeather = useMock ? mockData : {};
// define the primary atom
type WeatherObservers = Record<string, WeatherObservation>;
export const weatherObserversAtom = atom<WeatherObservers>(initialWeather);

/**
 * Supply individual atom from the provided siteId
 * 
 * All data is kept current inside weatherObserversAtom and is supplied
 * to decrease re-renders of React components.
 * 
 * @param siteId - identifier for the specific weather site
 * @returns A Jotai atom containing the WeatherObservation for the site, or undefined if it does not exist
 */
export const weatherSiteAtomFamily: (param: string) => 
  Atom<WeatherObservation | undefined> 
  = atomFamily((siteId: string) =>
    atom((get) => get(weatherObserversAtom)[siteId])
);


/**
 * Supply all active siteIds tracked.
 * 
 * @returns string[] of all siteIds tracked by weatherObserversAtom
 */
export const siteIdsAtom = atom((get) => 
    Object.keys(get(weatherObserversAtom))
);


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