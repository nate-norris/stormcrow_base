import { invoke } from "@tauri-apps/api/core";
import type { Test } from "@/models";

export async function getLastTest(): Promise<Test | null> {
  return await invoke("get_last_test_command");
}

export async function getTests(): Promise<Test[]> {
  return await invoke("get_tests_command");
}

export async function initiateTest(name: string): Promise<Test> {
  const [test] = await invoke<[Test, unknown]>("initiate_test_command", { name });
  return test;
}

export async function deleteTest(name: string): Promise<void> {
  await invoke("delete_test_command", { name });
}