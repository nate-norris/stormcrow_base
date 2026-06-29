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
export type WeatherObservers = Record<string, WeatherObservation>;
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


/*
TODO:
implement sorted derived atom for WeatherSites

const [siteIds] = useAtom(sortedSiteIdsAtom);

export const sortedSiteIdsAtom = atom((get) => {
  const observers = get(weatherObserversAtom);
  const settings = get(weatherSettingsAtom);

  return Object.values(observers)
    .slice() // avoid mutating source
    .sort((a, b) => {
      const aPriority = evaluateWindState(a, settings);
      const bPriority = evaluateWindState(b, settings);

      return aPriority - bPriority;
    })
    .map(obs => obs.siteId);
});

function evaluateWindState(
  obs: WeatherObservation,
  settings: WeatherSettings
) {
  if (obs.status !== "receiving") {
    return 3; // worst priority
  }

  if (Math.abs(obs.cross) > settings.maxCrosswind) {
    return 0; // critical
  }

  if (Math.abs(obs.headTail) > settings.maxHeadTail) {
    return 1; // warning
  }

  return 2; // normal
}
*/