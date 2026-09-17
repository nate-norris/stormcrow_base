import { store } from "@/state/store"

import { weatherRowsAtom } from "../state/weatherRowsAtom";
import type { WeatherRow } from "../core/weatherRow";

/**
 * Wipes and adds all WeatherRows to weatherRowsAtom.
 * Used on initialization of table for test session selections.
 * 
 * @param rows 
 */
export function hydrateQEs(rows: WeatherRow[]) {
  store.set(weatherRowsAtom, []);
  store.set(weatherRowsAtom, rows);
}