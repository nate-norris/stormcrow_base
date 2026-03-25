import { atom } from 'jotai'
import type { WeatherObservation, WeatherUpdate, WindFullEvent } from "./models";

// primary atom of siteId to WeatherObservation
type WeatherObservers = Record<string, WeatherObservation>;
export const weatherObserversAtom = atom<WeatherObservers>({});

// secondary log atom of siteId to timestamped wind value
type WindLog = Record<string, WindFullEvent>;
export const windLogAtom = atom<WindLog>({});

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

// three minute log of full wind value
export const updateWindLogAtom = atom(
  null,
  (_get, set, obs: WeatherObservation) => {
    set(windLogAtom, prev => {
      const newEntry: WindFullEvent = { time: obs.time, windFull: obs.windFull };

      const updated: WindLog = {
        ...prev,
        [obs.siteId]: newEntry,
      };

      // Drop old entries beyond the timeframe
      const cutoff = obs.time - 3 * 60_000; // 3 minutes
      Object.keys(updated).forEach(siteId => {
        if (updated[siteId].time < cutoff) delete updated[siteId];
      });

      return updated;
    });
  }
);

// delete wind value tracking
export const deleteWindLogAtom = atom(
  null,
  (_get, set, siteId: string) => {
    set(windLogAtom, prev => {
      const next = { ...prev };
      delete next[siteId];
      return next;
    });
  }
);