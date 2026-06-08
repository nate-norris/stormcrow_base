import { store } from "@/state";

import { QEFormState } from "../core/qe-form";
import { activeQEFormAtom } from "../state/loggingAtom";

export function prepareNextQE(qeForm: QEFormState) {
  store.set(activeQEFormAtom, {
    ...qeForm, // previous values
    qeCount: qeForm.qeCount + 1,
  });
}