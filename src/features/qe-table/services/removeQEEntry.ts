import { store } from "@/state/store"
import { type QEKey } from "../core/qeKey";
import { weatherRowsAtom } from "../state/weatherRowsAtom";
import { removeQERows } from "../actions/removeQERows";
import { removeQEDatabase } from "../actions/removeQEDatabase";
import { buildQEBaseFromKey } from "../actions/buildQEBaseFromKey";

export async function removeQE(key: QEKey) {
  const base = buildQEBaseFromKey(key);
  if (!base) return;

  await removeQEDatabase(base);

  // update UI table
  store.set(weatherRowsAtom,
    removeQERows(
      store.get(weatherRowsAtom),
      key
    )
  );
}