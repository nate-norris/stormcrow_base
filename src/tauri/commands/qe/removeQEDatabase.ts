import { invoke } from "@tauri-apps/api/core";

import { store } from "@/state";
import { activeTestAtom } from "@/features/test-session";
import { QE } from "@/features/qe";

import { QEBase } from "./types";

export async function removeQEDatabase(qe: QE): Promise<boolean> {
  const test = store.get(activeTestAtom);

  if (!test) {
    return false;
  }

  const base: QEBase = {
    count: qe.count,
    qeType: qe.qeType,
    testId: test.id,
  };

  await invoke("delete_qe_command", { base });

  return true;
}