import { store } from "@/state/store"
import { qeChangeAtom } from "../state/qeChangeAtom";
import { QEChange } from "../core/qeChange";

export function updateQEChangeEvent(change: QEChange) {
    // add QEChange event
  store.set(qeChangeAtom, change);
}
