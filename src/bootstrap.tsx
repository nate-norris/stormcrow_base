import { store, clockAtom } from "@/state";
import { initTauriListeners } from "@/tauri"
import { initSubscribers } from "./initSubscribers";

export async function bootstrapApp() {
    await initTauriListeners();
    const cleanupSubscribers = initSubscribers();
    
    const time = setInterval(() => {
        store.set(clockAtom, Date.now());
    }, 1000);

    return () => {
        cleanupSubscribers();
        clearInterval(time);
    };
}