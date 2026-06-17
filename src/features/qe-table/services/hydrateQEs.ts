import { store } from "@/state/store"

import { qeEntriesAtom } from "../state/qeEntries";
import { type WeatherRow } from "@/features/qe-logging";

export function hydrateQEs(rows: WeatherRow[]) {
  store.set(qeEntriesAtom, []);
  store.set(qeEntriesAtom, rows);
}