import type { WeatherRow } from "../core/weatherRow";
import type { QEKey } from "../core/qeKey";

export function rowsNotSpecifiedByKey(rows: WeatherRow[], key: QEKey): WeatherRow[] {
  return rows.filter(
    row =>
      !(
        row.count === key.count &&
        row.qeType === key.qeType
      )
  );
}