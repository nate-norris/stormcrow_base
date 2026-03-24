import { atom } from 'jotai'
import type { WeatherObservation } from "./models";

/// create atom for WeatherObservers which is an array of Observer
/// They will be mapped by observer id such as A, B, C, etc
/// the will need to allow for read, write, and update
///     consider using derived atoms for this

/*
Next level becomes:

Event → State Transition → Atom Update

Add an explicit domain layer:

initTauriListeners
        ↓
WeatherStreamReducer (NEW)
        ↓
Atoms

Where reducer decides:

valid transitions

timers

lifecycle
*/

// siteId to WeatherObservation
type WeatherObservers = Record<string, WeatherObservation>;
// type allowing partial update of WeatherObservation
type  WeatherObservationUpdate = Partial<WeatherObservation> & { siteId: string};
// primary atom holding WeatherObservers
export const weatherObserversAtom = atom<WeatherObservers>({});

// update only atom for last WeatherObservation
export const updateWeatherObserversAtom = atom(
  null,
  (_get, set, newObservation: WeatherObservationUpdate) => {
    set(weatherObserversAtom, prev => ({
      ...prev,
      [newObservation.siteId]: {
        ...(prev[newObservation.siteId] ?? {}),
        ...newObservation,
      } as WeatherObservation
    }))
  }
);

