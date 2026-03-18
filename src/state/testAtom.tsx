import { atom } from "jotai";
import type { Test, TestConfiguration } from "@/models";

export const activeTestAtom = atom<Test | null>(null);
export const activeConfigAtom = atom<TestConfiguration | null>(null);