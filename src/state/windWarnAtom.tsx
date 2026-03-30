import { atom } from "jotai";
import type { WindWarningConfig } from "@/models";

export const activeConfigAtom = atom<WindWarningConfig | null>(null);