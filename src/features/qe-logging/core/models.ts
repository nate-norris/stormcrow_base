export const QE_TYPES = {
  TR: "Test Round (TR)",
  WS: "Warmer Spotter (WS)",
} as const;
export type QEType = keyof typeof QE_TYPES;

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


// TODO: placeholder
// database needs to pass back
// combine with QEFormState and other fields that are passed per log
export type QELog = {
    dodic: string;
    lot: string;
    qeType: QEType;
    qeCount: number;
}