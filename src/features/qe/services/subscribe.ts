import { store } from "@/state";

import { QEEvent } from "../core/types";
import { qeEventAtom } from "../state/qeEventAtom";

export function subscribeToQEEvent<T extends QEEvent["type"]>(
  type: T,
  callback: (event: Extract<QEEvent, { type: T }>) => void,
) {
  return store.sub(qeEventAtom, () => {
    const event = store.get(qeEventAtom);

    if (event?.type === type) {
      callback(
        event as Extract<QEEvent, { type: T }>
      );
    }
  });
}
