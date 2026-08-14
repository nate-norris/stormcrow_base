import { atom } from 'jotai'

import type { WeatherObservation } from '@/features/incoming-weather';
import { compassDataAtom } from './compassAtom';

export const updateCompassAtom = atom(
    null,
    (_get, set, obs: WeatherObservation) => {
        set(compassDataAtom, prev => ({
            ...prev,
            [obs.siteId]: {
                windFull: obs.windFull,
                orientation: obs.windDir,
            },
        }));
    }
);