import { QE_EVENTS, subscribeToQEEvent } from "@/features/qe";

import { removeQETableRows } from "../actions/removeQETableRows";
import { addSingleQETableRows } from "../actions/addSingleQETableRows";

export function initQETableSubscribers() {

  const unsubscribeCreated = subscribeToQEEvent(
    QE_EVENTS.CREATED,
    event => {
      addSingleQETableRows(event.newTableRows);
    }
  );

  const unsubscribeDeleted = subscribeToQEEvent(
    QE_EVENTS.DELETED,
    event => {
      removeQETableRows(event.qe);
    }
  );

  const unsubscribeReassigned = subscribeToQEEvent(
    QE_EVENTS.REASSIGNED,
    event => {
      removeQETableRows(event.base);
      addSingleQETableRows(event.newTableRows);
    }
  );

  return () => {
    unsubscribeCreated();
    unsubscribeDeleted();
    unsubscribeReassigned();
  };
}