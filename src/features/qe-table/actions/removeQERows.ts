import { store } from "@/state/store"
import { weatherRowsAtom } from "../state/weatherRowsAtom";
import type { QEKey } from "../core/qeKey";
import { rowsNotSpecifiedByKey } from "./rowsNotByKey";

export function removeQERowsByKey(key: QEKey) {
  store.set(weatherRowsAtom,
      rowsNotSpecifiedByKey(
        store.get(weatherRowsAtom),
        key
      )
  );
}