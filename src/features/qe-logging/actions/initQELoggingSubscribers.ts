import { QE_EVENTS, subscribeToQEEvent } from "@/features/qe";

import { prepareNextQE } from "./prepareNextQE";

export function initQELoggingSubscribers() {

  const unsubscribeCreated = subscribeToQEEvent(
    QE_EVENTS.CREATED,
    event => {
      prepareNextQE(event.qe.count);
    }
  );

  return () => {
    unsubscribeCreated();
  };
}