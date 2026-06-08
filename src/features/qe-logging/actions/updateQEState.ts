import { store } from "@/state";

import { QEFormState } from "../core/qe-form";
import { WeatherRow } from "../core/qe_outputs";
import { activeQEFormAtom } from "../state/loggingAtom";

export function updateStateUponLog(qeForm: QEFormState, row: WeatherRow) {
  // increment to next QE in form
  prepareNextQE(qeForm);
  // update weather row atom
}

function prepareNextQE(qeForm: QEFormState) {
  store.set(activeQEFormAtom, {
    ...qeForm, // previous values
    qeCount: qeForm.qeCount + 1,
  });
}