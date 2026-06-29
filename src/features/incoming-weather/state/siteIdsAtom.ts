import { atom } from "jotai";

import { weatherObserversAtom } from "./weatherObserversAtom";

/**
 * Supply all active siteIds tracked.
 * 
 * Helper atom to iterate WeatherSites component.
 * 
 * @returns string[] of all siteIds tracked by weatherObserversAtom
 */
export const siteIdsAtom = atom((get) => 
    Object.keys(get(weatherObserversAtom))
);