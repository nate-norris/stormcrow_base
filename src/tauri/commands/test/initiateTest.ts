import { invoke } from "@tauri-apps/api/core";
import type { TestSession } from "@/features/test-session";

export async function initiateTest(name: string): Promise<TestSession> {
  return await invoke<TestSession>("initiate_test_command", { name });
}