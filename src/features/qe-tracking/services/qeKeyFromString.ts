import type { QEType, QEKey } from "@/features/qe-tracking";

export function qeKeyFromString(qeString: string): QEKey {
    const idx = qeString.search(/\D/);

    return {
        count: Number(qeString.slice(0, idx)),
        qeType: qeString.slice(idx) as QEType,
    };
}