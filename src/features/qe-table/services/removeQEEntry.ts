import { store } from "@/state/store"

import { type QEKey } from "../core/qeKey";
import { qeEntriesAtom } from "../state/qeEntries";
import { removeQERows } from "../actions/removeQERows";

export function removeQE(key: QEKey) {
  store.set(qeEntriesAtom,
    removeQERows(
      store.get(qeEntriesAtom),
      key
    )
  );
}