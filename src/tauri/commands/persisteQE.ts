import { invoke } from "@tauri-apps/api/core";

import { QEEntry } from "@/features/qe-logging/";
import type { WeatherRow } from "@/features/qe-table";

export async function dbPersistQEEntry(entry: QEEntry): Promise<WeatherRow[]> {
  return await invoke<WeatherRow[]>("insert_new_qe_command", { newQe: entry });
}