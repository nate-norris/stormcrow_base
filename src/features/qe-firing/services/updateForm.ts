import { QEFormState, defaultQEFormValues, QELog } from "../core/models";

export function updateQEFormFromLast(last: QELog | null): QEFormState {
  if (!last) {
    return structuredClone(defaultQEFormValues);
  }

  return {
    dodic: "",
    lot: "",
    qeType: last.qeType,
    qeCount: last.qeCount + 1,
  };
}