import { QEFormState, defaultQEFormValues } from "../core/models";

export function resetQEForm(): QEFormState {
  return structuredClone(defaultQEFormValues);
}