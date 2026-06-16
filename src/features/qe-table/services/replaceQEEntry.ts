import { store } from "@/state/store"

import { type WeatherRow, QEType } from "@/features/qe-logging";
import { type QEKey } from "../core/qeKey";
import { qeEntriesAtom } from "../state/qeEntries";
import { removeQERows } from "../actions/removeQERows";

export function replaceQE(rows: WeatherRow[]) {
    if (rows.length === 0) return;
    
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