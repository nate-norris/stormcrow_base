import { atom, Atom } from 'jotai'
import { weatherObserversAtom } from "./weatherAtoms";
import { WeatherObservation } from './models';

/**
 * Supply individual atom from the provided siteId
 * 
 * All data is kept current inside weatherObserversAtom and is supplied
 * to decrease re-renders of React components.
 * 
 * @param siteId - identifier for the specific weather site
 * @returns A Jotai atom containing the WeatherObservation for the site, or undefined if it does not exist
 */
export const getWeatherSiteAtom = (siteId: string): Atom<WeatherObservation | undefined> =>
    atom((get) => get(weatherObserversAtom)[siteId]);

/**
 * Supply all active siteIds tracked.
 * 
 * @returns string[] of all siteIds tracked by weatherObserversAtom
 */
export const siteIdsAtom = atom((get) => 
    Object.keys(get(weatherObserversAtom))
);