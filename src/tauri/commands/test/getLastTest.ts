import { invoke } from "@tauri-apps/api/core";
import type { Test } from "@/features/test-session";

export async function getLastTest(): Promise<Test | null> {
  return await invoke<Test | null>("get_last_test_command");
}