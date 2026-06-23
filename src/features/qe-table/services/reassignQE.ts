import { invoke } from "@tauri-apps/api/core";

import { QEBase } from "@/features/qe-logging";
import { WeatherRow } from "../core/weatherRow";
import { replaceQERows } from "./replaceQERows";
import { removeQERowsByKey } from "../actions/removeQERows";

export async function reassignQE(source: QEBase, destination: QEBase)
  : Promise<WeatherRow[]> {

    // get new rows from database entry
    const updatedRows = await invoke<WeatherRow[]>("reassign_qe_command", {
        source: source, 
        destination: destination
    });
    // drop previous source rows
    removeQERowsByKey({count: source.count, qeType: source.qeType});
    //update ui atom for new rows
    replaceQERows(updatedRows);

    return updatedRows;
}