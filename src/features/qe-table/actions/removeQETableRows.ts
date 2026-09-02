import { store } from "@/state/store"
import type { QE } from "@/features/qe";

import { weatherRowsAtom } from "../state/weatherRowsAtom";
import { rowsNotSpecifiedByQE } from "./rowsNotSpecifiedByQE";

export function removeQETableRows(qe: QE) {
  // remove from weather rows
  store.set(weatherRowsAtom,
    rowsNotSpecifiedByQE(
      store.get(weatherRowsAtom),
      qe
    )
  );
}

