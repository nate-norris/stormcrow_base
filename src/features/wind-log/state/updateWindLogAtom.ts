import { atom } from 'jotai'

import type { WeatherObservation } from '@/features/incoming-weather';
import type { WindEvent } from "../core/windEvent";
import { type WindLog, windLogAtom } from './windLogAtom';

// three minute log of full wind value
export const updateWindLogAtom = atom(
  null,
  (_get, set, obs: WeatherObservation) => {
    set(windLogAtom, prev => {
      const newEntry: WindEvent = { time: obs.time, windFull: obs.windFull };

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