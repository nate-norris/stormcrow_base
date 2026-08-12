import { atom } from 'jotai'

import { clockAtom } from "@/state";
import { type WindLog, windLogAtom } from './windLogAtom';
import { type WindChartPoint } from "../core/windChartPoint";
import { WIND_WINDOW } from '../core/constants';

const buildWindChartData = (windLog: WindLog, cutoff: number, 
    component: "cross" | "headTail"): WindChartPoint[] => {
  const points: WindChartPoint[] = [];

  for (const [siteId, events] of Object.entries(windLog)) {
    for (const event of events) {
      if (event.time < cutoff) continue;

      const value = event[component];
      if (value === undefined) continue;

      points.push({
        time: event.time,
        [siteId]: value,
      });
    }
  }

  return points.sort((a, b) => a.time - b.time);
};

export const crossWindChartDataAtom = atom((get) => {
  const windLog = get(windLogAtom);
  const cutoff = get(clockAtom) - WIND_WINDOW;

  return buildWindChartData(windLog, cutoff, "cross");
});

export const headTailWindChartDataAtom = atom((get) => {
  const windLog = get(windLogAtom);
  const cutoff = get(clockAtom) - WIND_WINDOW;

  return buildWindChartData(windLog, cutoff, "headTail");
});