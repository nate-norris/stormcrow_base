import { atom } from "jotai";
import { ColumnFiltersState } from "@tanstack/react-table";

export const tableFiltersAtom = atom<ColumnFiltersState>([]);