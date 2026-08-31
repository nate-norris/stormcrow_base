import { type QEKey } from "./qeKey";

export type QEChange =
    | {
        type: "deleted";
        key: QEKey;
    }
    | {
        type: "reassigned";
        key: QEKey;
    };