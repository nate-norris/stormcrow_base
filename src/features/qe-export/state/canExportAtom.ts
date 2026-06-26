import { atom } from "jotai";

import { activeTestAtom } from "@/features/test-session";
import { weatherRowsAtom } from "@/features/qe-table";

export const canExportAtom = atom<boolean>((get) => {
    const test = get(activeTestAtom);
    const weatherRows = get(weatherRowsAtom);

    return test !== null && weatherRows.length > 0;
});