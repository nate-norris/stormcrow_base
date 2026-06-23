import { store } from "@/state";

import { QEFormState } from "../core/qe-form";
import type { WeatherRow } from "@/features/qe-table";
import { activeQEFormAtom } from "../state/loggingAtom";
import { replaceQERows } from "@/features/qe-table";

export function updateStateUponLog(qeForm: QEFormState, rows: WeatherRow[]) {
  // increment to next QE in form
  prepareNextQE(qeForm);
  // update weather row atom
  replaceQERows(rows);
}

function prepareNextQE(qeForm: QEFormState) {
  store.set(activeQEFormAtom, {
    ...qeForm, // previous values
    qeCount: qeForm.qeCount + 1,
  });
}