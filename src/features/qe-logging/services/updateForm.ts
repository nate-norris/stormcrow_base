import { QEFormState, defaultQEFormValues } from "../core/qe-form";
import type { WeatherRow } from "@/features/qe-table";
import type { QEType } from "@/features/qe-tracking";

export function updateQEFormFromLast(last: WeatherRow | null): QEFormState {
  if (!last) return structuredClone(defaultQEFormValues);

  return {
    dodic: last.dodic,
    lot: last.lot,
    qeType: last.qeType as QEType,
    qeCount: last.count + 1,
  };
}