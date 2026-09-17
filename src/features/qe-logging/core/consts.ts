import { LoggingFormState } from "@/features/qe";

export const defaultLoggingFormValues = {
  dodic: "",
  lot: "",
  qe: {count: 1, qeType: "TR"},
} satisfies LoggingFormState;