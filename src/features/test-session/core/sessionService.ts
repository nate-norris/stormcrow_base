import { invoke } from "@tauri-apps/api/core";
import type { Test } from "../core/models";
import type { TestSession } from "../core/models";

export async function getLastTest(): Promise<Test | null> {
  return await invoke<Test | null>("get_last_test_command");
}

export async function getTests(): Promise<Test[]> {
  return await invoke<Test[]>("get_tests_command");
}

export async function initiateTest(name: string): Promise<TestSession> {
  return await invoke<TestSession>("initiate_test_command", { name });
}

export async function deleteTest(name: string): Promise<void> {
  await invoke("delete_test_command", { name });
}