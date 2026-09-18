import { atom } from "jotai";
import type { SortingState } from "@tanstack/react-table";

export const tableSortingAtom = atom<SortingState>([]);