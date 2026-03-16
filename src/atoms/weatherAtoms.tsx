import { atom } from 'jotai'
import type { WeatherObservation } from "@/models";

/// create atom for WeatherObservers which is an array of Observer
/// They will be mapped by observer id such as A, B, C, etc
/// the will need to allow for read, write, and update
///     consider using derived atoms for this

// siteId to WeatherObservation
type WeatherObservers = Record<string, WeatherObservation>;
export const weatherObserversAtom = atom<WeatherObservers>({});

// update only atom for last WeatherObservation
export const updateWeatherObserversAtom = atom(
  null,
  (get, set, newObservation: WeatherObservation) => {
    set(weatherObserversAtom, prev => ({
      ...prev,
      [newObservation.siteId]: newObservation,
    }))
  }
);

export const sortedWeatherObserversAtom = atom(get) => {
    // TODO
    const observations = Object.values(get(weatherObserversAtom))
    return observations[0]
}