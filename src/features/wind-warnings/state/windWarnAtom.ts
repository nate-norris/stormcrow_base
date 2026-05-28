import { atom } from "jotai";
import type { WindWarningConfig } from "../core/models";

export const activeConfigAtom = atom<WindWarningConfig | null>(null);