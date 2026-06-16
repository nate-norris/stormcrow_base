import { type WeatherRow } from "@/features/qe-logging";
import { type QEKey } from "../core/qeKey";

export function removeQERows(rows: WeatherRow[], key: QEKey): WeatherRow[] {
  return rows.filter(
    row =>
      !(
        row.count === key.count &&
        row.qeType === key.qeType
      )
  );
}