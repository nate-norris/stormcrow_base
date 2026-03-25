import { atom } from 'jotai'
import type { WeatherObservation, WeatherUpdate } from "./models";

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
// primary atom holding WeatherObservers
export const weatherObserversAtom = atom<WeatherObservers>({});


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

// TODO: add atom for last 5 minutes of full wind value

// TODO: add option for deletion of atom if data is STALE/NOT_RECEIVING
//    see WeatherStreamProcessor.deleteTimer for completely wiping
// deleteWeatherObserverAtom(siteId: num)