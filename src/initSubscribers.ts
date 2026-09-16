import { initQETableSubscribers } from "@/features/qe-table";
import { initQELoggingSubscribers } from "./features/qe-logging";

export function initSubscribers() {
  const cleanups = [
    initQETableSubscribers(),
    initQELoggingSubscribers(),
  ];

  return () => {
    for (const cleanup of cleanups) {
      cleanup();
    }
  };
}