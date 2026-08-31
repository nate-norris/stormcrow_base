import { type QEType } from "@/features/qe-logging";

export type LoggingStatus = {
    qeCount: number | null;
    qeType: QEType | null;
};