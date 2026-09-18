import { atom } from "jotai";
import type { SortingState } from "@tanstack/react-table";

const initialSort = [{id: 'time', desc: true}, ];
export const tableSortingAtom = atom<SortingState>(initialSort);