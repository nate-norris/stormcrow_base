import { invoke } from "@tauri-apps/api/core";

import { store } from "@/state";
import { activeTestAtom } from "@/features/test-session";
import { QE } from "@/features/qe";
import { WeatherRow } from "@/features/qe-table";

import { QEBase } from "./types";

export async function reassignQEDatabase(source: QE, destination: QE)
  : Promise<WeatherRow[] | null> {
  const test = store.get(activeTestAtom);

  if (!test) return null;

  const sourceBase: QEBase = {
    count: source.count,
    qeType: source.qeType,
    testId: test.id,
  };
  const destinationBase: QEBase = {
    count: destination.count,
    qeType: destination.qeType,
    testId: test.id,
  };

  // get new rows from database entry
  return await invoke<WeatherRow[]>("reassign_qe_command", {
    source: sourceBase, 
    destination: destinationBase
  });
}
