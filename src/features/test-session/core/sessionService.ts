import { invoke } from "@tauri-apps/api/core";
import type { Test } from "@/models";
import type { WindWarningConfig } from "@/features/wind-warnings";

export async function getLastTest(): Promise<Test | null> {
  return await invoke<Test | null>("get_last_test_command");
}

export async function getTests(): Promise<Test[]> {
  return await invoke<Test[]>("get_tests_command");
}

export async function initiateTest(name: string): Promise<[Test, WindWarningConfig]> {
  // TODO update WindWarn atom
  return await invoke<[Test, WindWarningConfig]>("initiate_test_command", { name });
}

export async function deleteTest(name: string): Promise<void> {
  await invoke("delete_test_command", { name });
}