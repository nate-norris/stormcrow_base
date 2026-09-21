import { listen } from "@tauri-apps/api/event";

import { store } from "@/state";
import { logQE, autoLogAtom } from "@/features/qe-logging";
import { TauriEventHandler } from "./models";

export const boomHandler: TauriEventHandler = {
  async register() {
    const unlisten = await listen<null>("boom", async (_event) => {
      const isAutoLog = store.get(autoLogAtom);
      if (isAutoLog) {
        await logQE();
      }
    });

    return () => {
      unlisten();
    }
  },
}