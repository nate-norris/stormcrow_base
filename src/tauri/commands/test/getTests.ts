import { invoke } from "@tauri-apps/api/core";
import type { Test } from "@/features/test-session";

export async function getTests(): Promise<Test[]> {
  return await invoke<Test[]>("get_tests_command");
}