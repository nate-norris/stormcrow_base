import { store } from "@/state/store"

import { weatherRowsAtom } from "../state/weatherRowsAtom";
import type { WeatherRow } from "../core/weatherRow";

export function hydrateQEs(rows: WeatherRow[]) {
  store.set(weatherRowsAtom, []);
  store.set(weatherRowsAtom, rows);
}