import { invoke } from "@tauri-apps/api/core";

import { QEEntry } from "../core/qe-log";

export async function dbPersistQEEntry(entry: QEEntry) {
  await invoke("insert_new_qe_command", { newQe: entry });
}