import { store } from "@/state/store"
import type { QEBase } from "@/features/qe-logging";
import type { QEKey } from "../core/qeKey";
import { activeTestAtom } from "@/features/test-session";

export function buildQEBaseFromKey(key: QEKey): QEBase | null {
    const test = store.get(activeTestAtom);
    if (!test) return null;

    return {
        count: key.count,
        qeType: key.qeType,
        testId: test.id,
    }
}