import { store } from "@/state/store"

import { QEBase } from "@/features/qe-logging";
import { activeTestAtom } from "@/features/test-session";
import { type QEKey } from "../core/qeKey";
import { weatherRowsAtom } from "../state/weatherRowsAtom";
import { removeQERows } from "../actions/removeQERows";
import { removeQEDatabase } from "../actions/removeQEDatabase";

export async function removeQE(key: QEKey) {
  const test = store.get(activeTestAtom);
  if (!test) return;

  // remove from database
  const base: QEBase = {
    count: key.count,
    qeType: key.qeType,
    testId: test?.id,
  }
  await removeQEDatabase(base);

  // update UI table
  store.set(weatherRowsAtom,
    removeQERows(
      store.get(weatherRowsAtom),
      key
    )
  );
}