import { invoke } from "@tauri-apps/api/core";

import { store } from "@/state";
import { activeTestAtom } from "@/features/test-session";
import type { LocationConfig } from "@/features/location";

export async function getTestLocationConfig(): Promise<LocationConfig | null> {

  const test = store.get(activeTestAtom);
  if (!test) return null;

  return await invoke<LocationConfig | null>("get_location_command", {
    testId: test.id,
  });
}