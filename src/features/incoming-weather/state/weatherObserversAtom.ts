import { atom } from "jotai";

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