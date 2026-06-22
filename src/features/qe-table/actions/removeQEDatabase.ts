import { invoke } from "@tauri-apps/api/core";

import { QEBase } from "@/features/qe-logging";

export async function removeQEDatabase(base: QEBase): Promise<void> {
  await invoke("delete_qe_command", {base});
}