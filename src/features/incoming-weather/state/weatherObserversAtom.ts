import { atom } from "jotai";

import type { WeatherObservation } from "../core/models";
import { mockData } from "./mockWeather";

// set if Vite .env is set to use mock weather
const useMock =
  (import.meta.env.VITE_USE_MOCK_WEATHER ?? "false") === "true";
// pull initial mocked weather if present
const initialWeather = useMock ? mockData : {};
// define the primary atom
export type WeatherObservers = Record<string, WeatherObservation>;
export const weatherObserversAtom = atom<WeatherObservers>(initialWeather);