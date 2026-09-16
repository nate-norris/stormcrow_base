import { type WeatherRow } from "@/features/qe-table";

import { QE_TYPES, QE_COMMANDS, QE_EVENTS } from "./consts";

export type QEType = keyof typeof QE_TYPES;

export type QE = {
  count: number;
  qeType: QEType;
};

export type LoggingFormState = {
    dodic: string;
    lot: string;
    qe: QE
};

export type QECommand =
| {
    type: typeof QE_COMMANDS.CREATE;
    loggingForm: LoggingFormState;
  }
  | {
    type: typeof QE_COMMANDS.DELETE;
    qe: QE;
  } | {
    type: typeof QE_COMMANDS.REASSIGN;
    base: QE;
    destination: QE;
  };

export type QEEvent = 
  {
    type: typeof QE_EVENTS.CREATED;
    qe: QE;
    newTableRows: WeatherRow[];
  } |
  {
    type: typeof QE_EVENTS.DELETED;
    qe: QE;
  } | {
    type: typeof QE_EVENTS.REASSIGNED;
    base: QE;
    destination: QE;
    newTableRows: WeatherRow[];
  }
