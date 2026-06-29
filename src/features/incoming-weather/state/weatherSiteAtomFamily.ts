import { atom, Atom } from "jotai";
import { atomFamily } from "jotai/utils";

import { weatherObserversAtom } from "./weatherObserversAtom";
import type { WeatherObservation } from "../core/models";

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