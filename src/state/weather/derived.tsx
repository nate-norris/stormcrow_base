import { atom } from 'jotai'
import { weatherObserversAtom } from "./weatherAtoms";

/**
 * All data is kept current inside weatherObserversAtom and is supplied
 * to decrease re-renders of React components.
 * 
 * @param siteId - identifier for the specific weather site
 */
export const getWeatherSiteAtom = (siteId: string) =>
    atom((get) => get(weatherObserversAtom)[siteId]);
