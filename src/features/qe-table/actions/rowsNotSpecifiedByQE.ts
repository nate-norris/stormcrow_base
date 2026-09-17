import type { WeatherRow } from "../core/weatherRow";
import type { QE } from "@/features/qe";

export function rowsNotSpecifiedByQE(rows: WeatherRow[], qe: QE): WeatherRow[] {
  return rows.filter(
    row =>
      !(
        row.count === qe.count &&
        row.qeType === qe.qeType
      )
  );
}