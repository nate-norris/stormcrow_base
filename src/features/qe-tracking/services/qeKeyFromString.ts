import type { QEType, QEKey } from "@/features/qe-tracking";

export function parseQEKey(qeKey: string): QEKey {
    const idx = qeKey.search(/\D/);

    return {
        count: Number(qeKey.slice(0, idx)),
        qeType: qeKey.slice(idx) as QEType,
    };
}