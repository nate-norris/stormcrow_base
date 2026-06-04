import { getDefaultStore } from "jotai";
import { buildQEEntry } from "./buildQEEntry";

export default async function logQE() {
  const store = getDefaultStore();

  const entry = buildQEEntry(store);

  // validateQEEntry(entry);
  // await submitQEEntry(entry);
  // updateQEState();
}