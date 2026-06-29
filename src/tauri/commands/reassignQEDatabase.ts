import { invoke } from "@tauri-apps/api/core";

import { QEBase } from "@/features/qe-logging";
import { WeatherRow } from "@/features/qe-table";

export async function reassignQEDatabase(source: QEBase, destination: QEBase)
    : Promise<WeatherRow[]> {

    // get new rows from database entry
    return await invoke<WeatherRow[]>("reassign_qe_command", {
        source: source, 
        destination: destination
    });
}