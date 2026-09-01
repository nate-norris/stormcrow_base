import type { QE } from "@/features/qe"
import type { WeatherRow } from "../core/weatherRow";

export function doesQEExist(qe: QE, rows: WeatherRow[]): boolean {
  return rows.some(
    row =>
      row.count === qe.count &&
      row.qeType === qe.qeType
  );
}