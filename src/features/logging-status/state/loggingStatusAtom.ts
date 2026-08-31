import { atom } from "jotai";

import { type LoggingStatus } from "../core/types";

export const loggingStatusAtom = atom<LoggingStatus>({
    qeCount: null,
    qeType: null,
});
