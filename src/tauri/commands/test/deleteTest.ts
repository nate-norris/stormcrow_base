import { invoke } from "@tauri-apps/api/core";

export async function deleteTest(name: string): Promise<void> {
  await invoke("delete_test_command", { name });
}