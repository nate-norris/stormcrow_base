import { atom } from "jotai";
import type { Test } from "../core/models";

export const activeTestAtom = atom<Test | null>(null);