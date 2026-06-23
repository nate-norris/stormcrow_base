import { type QEKey } from "../core/qeKey";
import { removeQERowsByKey } from "../actions/removeQERows";
import { removeQEDatabase } from "../actions/removeQEDatabase";
import { buildQEBaseFromKey } from "../actions/buildQEBaseFromKey";

export async function removeQE(key: QEKey) {
  const base = buildQEBaseFromKey(key);
  if (!base) return;

  // remove from database
  await removeQEDatabase(base);

  // update UI table
  removeQERowsByKey(key);
}