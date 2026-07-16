import { atom } from 'jotai'

import { clockAtom } from "@/state";
import { windLogAtom } from './windLogAtom';
import { type WindChartPoint } from "../core/windChartPoint";

const WIND_WINDOW = 3 * 60 * 1000;

export const windChartDataAtom = atom((get) => {
    const windLog = get(windLogAtom);
    const cutoff = get(clockAtom) - WIND_WINDOW;
    const points: WindChartPoint[] = [];

    for (const [siteId, events] of Object.entries(windLog)) {
        for (const event of events) {
            // bypass points no longer in window
            if (event.time < cutoff) continue;

            const point: WindChartPoint = {
                time: event.time,
                [siteId]: event.windFull,
            };
            points.push(point);
        }
    }

    return points.sort((a, b) => a.time - b.time);
});