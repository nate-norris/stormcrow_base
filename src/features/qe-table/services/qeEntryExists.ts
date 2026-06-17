import { store } from "@/state/store"

import { weatherRowsAtom } from "../state/weatherRowsAtom";
import { type QEKey } from "../core/qeKey";

export function qeExistsInStore(qeKey: QEKey): boolean {
    const rows = store.get(weatherRowsAtom);
    return rows.some( row =>
        row.count === qeKey.count &&
        row.qeType === qeKey.qeType
    );
}