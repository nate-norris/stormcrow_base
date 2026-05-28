import { invoke } from "@tauri-apps/api/core";

import { WindWarningConfig } from "../core/models";

export async function updateConfiguration(config: WindWarningConfig): 
  Promise<void> {
  await invoke("update_configuration_command", {
    config,
  });
}