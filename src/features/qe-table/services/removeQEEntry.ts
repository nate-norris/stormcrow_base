import { type QEKey } from "../core/qeKey";
import { removeQERowsByKey } from "../actions/removeQERows";
import { removeQEDatabase } from "@/tauri";
import { buildQEBaseFromKey } from "../actions/buildQEBaseFromKey";
import { updateQEChangeEvent } from "../actions/updateQEChangeEvent";

export async function removeQE(key: QEKey) {
  const base = buildQEBaseFromKey(key);
  if (!base) return;

  // remove from database
  await removeQEDatabase(base);

  // update UI table
  removeQERowsByKey(key);

  // add QEChange event
  updateQEChangeEvent({type: "deleted", key: key});
}