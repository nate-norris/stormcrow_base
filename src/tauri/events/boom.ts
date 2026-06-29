import { listen } from "@tauri-apps/api/event";

import { logQE } from "@/features/qe-logging";
import { TauriEventHandler } from "./models";

export const boomHandler: TauriEventHandler = {
    async register() {
        await listen<null>("boom", async (_event) => {
            await logQE();
        });
    },
}