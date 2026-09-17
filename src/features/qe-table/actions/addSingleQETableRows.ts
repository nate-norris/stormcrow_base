import { store } from "@/state/store"
import { weatherRowsAtom } from "../state/weatherRowsAtom";
import type { QEType, QE } from "@/features/qe";
import type { WeatherRow } from "../core/weatherRow";
import { rowsNotSpecifiedByQE } from "./rowsNotSpecifiedByQE";

export function addSingleQETableRows(newRows: WeatherRow[]) {
    // no qe to be added
    if (newRows.length === 0) return;

    // confirm no mixing of QEs and has same count/type
    if (!isSingleQE(newRows)) 
        throw new Error("Attempted replace of more than one QE.");
    
    // add to table row source
    const qe: QE = {
        count: newRows[0].count,
        qeType: newRows[0].qeType as QEType,
    }

    // drop any previous rows at QE and add new rows
    store.set(weatherRowsAtom, [
      ...rowsNotSpecifiedByQE(store.get(weatherRowsAtom), qe),
      ...newRows,
    ]);
}

function isSingleQE(rows: WeatherRow[]): boolean {
  const { count, qeType } = rows[0];

  return rows.every(
    row =>
      row.count === count &&
      row.qeType === qeType
  );
}