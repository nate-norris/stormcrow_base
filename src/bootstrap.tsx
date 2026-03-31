import { initTauriListeners } from "@/lib/tauriEvents"

export async function bootstrapApp() {
    await initTauriListeners();
}