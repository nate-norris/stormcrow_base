import { store } from "@/state/store"

import { qeEntriesAtom } from "../state/qeEntries";
import { type QEKey } from "../core/qeKey";

export function qeExists(qeKey: QEKey): boolean {
    const rows = store.get(qeEntriesAtom);
    return rows.some( row =>
        row.count === qeKey.count &&
        row.qeType === qeKey.qeType
    );
}