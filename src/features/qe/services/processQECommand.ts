import { removeQEDatabase, reassignQEDatabase, persistQEDatabase } 
  from "@/tauri";

import { store } from "@/state";

import { QECommand } from "../core/types";
import { QE_COMMANDS, QE_EVENTS } from "../core/consts";
import { emitQEEventAtom } from "../state/qeEventAtom";

export async function processQECommand(command: QECommand): Promise<boolean> {
  console.log('process qe command');

  switch (command.type) {

    case QE_COMMANDS.CREATE:
      console.log('create command');
      const rowsAdded = await persistQEDatabase(command.loggingForm);
      if (rowsAdded) {
        store.set(emitQEEventAtom, {
          type: QE_EVENTS.CREATED,
          qe: command.loggingForm.qe,
          newTableRows: rowsAdded
        });
        return true;
      }
      return false;

    case QE_COMMANDS.DELETE:
      const isRemoved = await removeQEDatabase(command.qe);
      if (isRemoved) {
        store.set(emitQEEventAtom, {
          type: QE_EVENTS.DELETED, 
          qe: command.qe
        });
      }
      return isRemoved;

    case QE_COMMANDS.REASSIGN:
      const rowsReassigned = 
        await reassignQEDatabase(command.base, command.destination);

      if (rowsReassigned) {
        store.set(emitQEEventAtom, {
          type: QE_EVENTS.REASSIGNED,
          base: command.base,
          destination: command.destination,
          newTableRows: rowsReassigned
        });
        return true;
      }
      return false;

  }
  return false;
}
