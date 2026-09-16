import { atom } from "jotai";

import type { QEEvent } from "../core/types";

// the last stored QEEvent that has occured
export const qeEventAtom = atom<QEEvent | null>(null);

// derived write-only atom for event updates
export const emitQEEventAtom = atom(
    null,
    (_get, set, event: QEEvent) => {
        set(qeEventAtom, event);
    }
);