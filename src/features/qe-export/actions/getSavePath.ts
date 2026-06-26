
import { save } from "@tauri-apps/plugin-dialog";

export async function getSavePath(): Promise<string | null> {
    const path = await save({
    defaultPath: "weather_export.csv",
    filters: [{
        name: "CSV",
        extensions: ["csv"]
    }]
    });

    return path;
}