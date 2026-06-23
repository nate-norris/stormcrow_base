import type { QEType } from "@/features/qe-logging";
import type { WeatherRow } from "../core/weatherRow";
import type { QEKey } from "../core/qeKey";
import { replaceQERowsWithNewRows } from "../actions/removeQERows";

export function replaceQEInTable(newRows: WeatherRow[]) {
    // no qe to delete
    if (newRows.length === 0) return;
    // confirm no mixing of QEs and has same QEKey
    if (!isSingleQE(newRows)) 
        throw new Error("Test selection required to log QEs.");
    
    // add to table row source
    const key: QEKey = {
        count: newRows[0].count,
        qeType: newRows[0].qeType as QEType,
    }
    replaceQERowsWithNewRows(newRows, key);
}

function isSingleQE(rows: WeatherRow[]): boolean {
  const { count, qeType } = rows[0];

  return rows.every(
    row =>
      row.count === count &&
      row.qeType === qeType
  );
}