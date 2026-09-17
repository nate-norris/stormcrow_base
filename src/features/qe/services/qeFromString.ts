import type { QEType, QE } from "../core/types";

/**
 * Parse a string and return QE containing count and qeType
 * 
 * @param qeString : string to be parsed
 * @returns QE 
 */
export function qeFromString(qeString: string): QE {
    const idx = qeString.search(/\D/);

    return {
        count: Number(qeString.slice(0, idx)),
        qeType: qeString.slice(idx) as QEType,
    };
}