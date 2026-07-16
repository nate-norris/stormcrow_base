import { atom } from 'jotai'

import { clockAtom } from "@/state";
import { windLogAtom } from './windLogAtom';
import { type WindChartPoint } from "../core/windChartPoint";
import { WIND_WINDOW } from '../core/constants';



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