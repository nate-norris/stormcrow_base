import { atom } from 'jotai'

import { clockAtom } from "@/state";
import { windLogAtom } from './windLogAtom';

const WIND_WINDOW = 3 * 60 * 1000;

export const windChartDataAtom = atom((get) => {
    const windLog = get(windLogAtom);
    const cutoff = get(clockAtom) - WIND_WINDOW;
    const points = new Map<number, Record<string, number>>();

    for (const [siteId, events] of Object.entries(windLog)) {
        for (const event of events) {
            if (event.time < cutoff) continue;

            const point = points.get(event.time) ?? {
                time: event.time
            };

            point[siteId] = event.windFull;

            points.set(event.time, point);
        }
    }

    console.log(points);
    return Array.from(points.values())
        .sort((a, b) => a.time - b.time);
});