import { initTauriListeners } from "@/tauri"

export async function bootstrapApp() {
    await initTauriListeners();
}