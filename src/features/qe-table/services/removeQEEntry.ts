import { store } from "@/state/store"

import { type QEKey } from "../core/qeKey";
import { weatherRowsAtom } from "../state/weatherRowsAtom";
import { removeQERows } from "../actions/removeQERows";

export function removeQE(key: QEKey) {
  store.set(weatherRowsAtom,
    removeQERows(
      store.get(weatherRowsAtom),
      key
    )
  );
}