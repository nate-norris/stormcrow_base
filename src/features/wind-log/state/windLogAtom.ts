import { atom } from 'jotai'
import type { WeatherObservation, WindFullEvent } from "../core/models";

type WindLog = Record<string, WindFullEvent>;
export const windLogAtom = atom<WindLog>({});

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