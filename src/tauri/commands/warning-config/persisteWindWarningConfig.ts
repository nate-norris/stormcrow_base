import { invoke } from "@tauri-apps/api/core";

import type { WindWarningConfig } from "@/features/wind-warnings";

export async function persistWindWarningConfig(config: WindWarningConfig): 
  Promise<void> {
  await invoke("update_configuration_command", {
    config,
  });
}