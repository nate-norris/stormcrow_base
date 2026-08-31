import { type QEType } from "@/features/qe-tracking";

export type LoggingStatus = {
    qeCount: number | null;
    qeType: QEType | null;
};