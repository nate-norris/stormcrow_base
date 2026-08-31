import { QE_TYPES } from "./consts";

export type QEType = keyof typeof QE_TYPES;

export type QEKey = {
  count: number;
  qeType: QEType;
};

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
