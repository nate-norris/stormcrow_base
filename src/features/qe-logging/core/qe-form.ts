import { QEType } from "./qe-types";

export type QEFormState = {
    dodic: string;
    lot: string;
    qeCount: number;
    qeType: QEType;
};

export const defaultQEFormValues = {
  dodic: "",
  lot: "",
  qeCount: 1,
  qeType: "TR",
} satisfies QEFormState;