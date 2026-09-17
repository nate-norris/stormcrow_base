import { store } from "@/state";
import { activeQEAtom, QEType } from "@/features/qe";
import type { WeatherRow } from "@/features/qe-table";

import { dodicAtom } from "../state/dodicAtom";
import { lotAtom } from "../state/lotAtom";
import { resetQEForm } from "./resetForm";

/**
 * Set atoms needed for form update based off last WeatherRow
 * 
 * Provides default values if no QEs have been submitted for the test.
 * If at least one row has been logged the QE count is increased by 1.
 * 
 * @param last the last row logged in the database for the selected test session
 */
export function updateQEFormFromLast(last: WeatherRow | null) {
  if (!last) {
    resetQEForm();
  } else {
    store.set(dodicAtom, last.dodic);
    store.set(lotAtom, last.lot);
    store.set(activeQEAtom, {
      count: last.count + 1,
      qeType: last.qeType as QEType
    });
  }
}