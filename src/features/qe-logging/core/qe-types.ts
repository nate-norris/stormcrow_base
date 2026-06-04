export const QE_TYPES = {
  TR: "Test Round (TR)",
  WS: "Warmer Spotter (WS)",
} as const;
export type QEType = keyof typeof QE_TYPES;