import { store } from "@/state/store"

import { type WeatherRow, QEType } from "@/features/qe-logging";
import { type QEKey } from "../core/qeKey";
import { qeEntriesAtom } from "../state/qeEntries";
import { removeQERows } from "../actions/removeQERows";

export function replaceQE(rows: WeatherRow[]) {
    // no qe to delete
    if (rows.length === 0) return;
    // rows provided are not apart of the same QE
    if (!isSingleQE(rows)) 
        throw new Error("Test selection required to log QEs.");
    
    const key: QEKey = {
        count: rows[0].count,
        qeType: rows[0].qeType as QEType,
    }
    
    const allRows = store.get(qeEntriesAtom);
    store.set(qeEntriesAtom, [
        ...removeQERows(allRows, key),
        ...rows,
    ]);
}

function isSingleQE(rows: WeatherRow[]): boolean {
  const { count, qeType } = rows[0];

  return rows.every(
    row =>
      row.count === count &&
      row.qeType === qeType
  );
}