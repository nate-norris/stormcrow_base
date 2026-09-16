import { store } from "@/state";
import { activeQEAtom } from "@/features/qe";

import { dodicAtom } from "../state/dodicAtom";
import { lotAtom } from "../state/lotAtom";
import { defaultLoggingFormValues } from "../core/consts";

export function resetQEForm() {
  store.set(dodicAtom, defaultLoggingFormValues.dodic);
  store.set(lotAtom, defaultLoggingFormValues.lot);
  store.set(activeQEAtom, defaultLoggingFormValues.qe);
}