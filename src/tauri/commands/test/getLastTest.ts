import { invoke } from "@tauri-apps/api/core";
import type { LastTest } from "@/features/test-session";

export async function getLastTest(): Promise<LastTest | null> {
  return await invoke<LastTest | null>("get_last_test_command");
}