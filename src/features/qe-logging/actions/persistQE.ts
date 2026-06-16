import { invoke } from "@tauri-apps/api/core";

import { QEEntry } from "../core/qe-log";
import { WeatherRow } from "../core/qe_outputs";

export async function dbPersistQEEntry(entry: QEEntry): Promise<WeatherRow[]> {
  return await invoke<WeatherRow[]>("insert_new_qe_command", { newQe: entry });
}