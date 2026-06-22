import type { QEKey } from "../core/qeKey";
import type { QEType } from "@/features/qe-logging";

export function parseQEKey(qeKey: string): QEKey {
    const idx = qeKey.search(/\D/);

    return {
        count: Number(qeKey.slice(0, idx)),
        qeType: qeKey.slice(idx) as QEType,
    };
}