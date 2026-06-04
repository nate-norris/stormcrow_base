import { QEFormState, defaultQEFormValues } from "../core/qe-form";
import { QEEntry } from "../core/qe-log";

export function updateQEFormFromLast(last: QEEntry | null): QEFormState {
  if (!last) {
    return structuredClone(defaultQEFormValues);
  }

  return {
    dodic: "",
    lot: "",
    qeType: last.base.qeType,
    qeCount: last.base.count + 1,
  };
}