import { store } from "@/state/store"
import { weatherRowsAtom } from "../state/weatherRowsAtom";
import type { WeatherRow } from "../core/weatherRow";
import type { QEKey } from "../core/qeKey";

export function removeQERowsByKey(key: QEKey) {
  store.set(weatherRowsAtom,
      rowsNotSpecifiedByKey(
        store.get(weatherRowsAtom),
        key
      )
  );
}

export function replaceQERowsWithNewRows(newRows: WeatherRow[], key: QEKey) {
  store.set(weatherRowsAtom, [
    ...rowsNotSpecifiedByKey(store.get(weatherRowsAtom), key),
    ...newRows,
  ]);
}

function rowsNotSpecifiedByKey(rows: WeatherRow[], key: QEKey): WeatherRow[] {
  return rows.filter(
    row =>
      !(
        row.count === key.count &&
        row.qeType === key.qeType
      )
  );
}