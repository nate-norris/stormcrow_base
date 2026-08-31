import { type QEKey } from "./qeKey";

export type QEChange =
    | {
        type: "deleted";
        key: QEKey;
    }
    | {
        type: "reassigned";
        oldKey: QEKey;
        newKey: QEKey;
    } | {
        type: "new";
        key: QEKey;
    };