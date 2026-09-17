import { store } from "@/state";
import { qeCountAtom } from "@/features/qe";

export function prepareNextQE(currentQECount: number) {
  store.set(qeCountAtom, currentQECount + 1);
}