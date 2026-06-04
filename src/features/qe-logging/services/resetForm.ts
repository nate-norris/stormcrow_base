import { QEFormState, defaultQEFormValues } from "../core/qe-form";

export function resetQEForm(): QEFormState {
  return structuredClone(defaultQEFormValues);
}