import { store } from "@/state/store"
import { weatherRowsAtom } from "../state/weatherRowsAtom";
import type { QEKey } from "@/features/qe-tracking";
import { rowsNotSpecifiedByKey } from "./rowsNotByKey";

export function removeQERowsByKey(key: QEKey) {
  // remove from weather rows
  store.set(weatherRowsAtom,
    rowsNotSpecifiedByKey(
      store.get(weatherRowsAtom),
      key
    )
  );
}