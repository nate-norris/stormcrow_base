import { store, clockAtom } from "@/state";
import { initTauriListeners } from "@/tauri"

export async function bootstrapApp() {
    await initTauriListeners();
    
    const time = setInterval(() => {
        store.set(clockAtom, Date.now());
    }, 1000);

    return () => {
        clearInterval(time);
    };
}