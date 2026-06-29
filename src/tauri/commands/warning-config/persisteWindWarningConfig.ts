import { invoke } from "@tauri-apps/api/core";

import type { WindWarningConfig } from "@/features/wind-warnings";

export async function updateConfiguration(config: WindWarningConfig): 
  Promise<void> {
  await invoke("update_configuration_command", {
    config,
  });
}