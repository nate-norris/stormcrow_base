import { invoke } from "@tauri-apps/api/core";

import { store } from "@/state";
import { activeTestAtom } from "@/features/test-session";
import type { AzimuthRawInput } from "@/features/location";

export async function persistLocationConfig(weapon: AzimuthRawInput, target: AzimuthRawInput): Promise<void> {

  const test = store.get(activeTestAtom);
  if (!test) return;

  await invoke("update_location_command", {
    testId: test.id, weapon, target
  });
}