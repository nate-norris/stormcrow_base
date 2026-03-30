import { atom } from "jotai";
import type { Test } from "@/models";

export const activeTestAtom = atom<Test | null>(null);