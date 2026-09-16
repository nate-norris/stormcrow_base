import { store } from "@/state";

import { LoggingFormState, activeQEAtom } from "@/features/qe";
import { dodicAtom } from "../state/dodicAtom";
import { lotAtom } from "../state/lotAtom";

export function gatherLoggingFormState(): LoggingFormState {
  return {
    dodic: store.get(dodicAtom),
    lot: store.get(lotAtom),
    qe: store.get(activeQEAtom)
  }
}