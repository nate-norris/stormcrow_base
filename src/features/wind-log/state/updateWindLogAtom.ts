import { atom } from 'jotai'

import type { WeatherObservation } from '@/features/incoming-weather';
import type { WindEvent } from "../core/windEvent";
import { windLogAtom } from './windLogAtom';

export const updateWindLogAtom = atom(
  null,
  (_get, set, obs: WeatherObservation) => {
    set(windLogAtom, prev => {
      const history = prev[obs.siteId] ?? [];
      const newEntry: WindEvent = { time: obs.time, windFull: obs.windFull };
      console.log(newEntry);

      return {
        ...prev,
        [obs.siteId]: [
          ...history,
          newEntry
        ]
      };
    });
  }
);