export const QE_TYPES = {
  TR: "Test Round (TR)",
  WS: "Warmer Spotter (WS)",
} as const;

export const QE_COMMANDS = {
  CREATE: "create",
  DELETE: "delete",
  REASSIGN: "reassign",
} as const;

export const QE_EVENTS = {
  CREATED: "created",
  DELETED: "deleted",
  REASSIGNED: "reassigned",
} as const;