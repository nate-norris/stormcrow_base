import { atom } from "jotai";

import { type QEChange } from "../core/qeChange";

export const qeChangeAtom = atom<QEChange | null>(null);