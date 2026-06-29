import { invoke } from "@tauri-apps/api/core";

export async function saveTestQEsToPath(testId: number, path: string): Promise<void> {
  return await invoke("export_test_to_path_command", { testId: testId, path: path });
}