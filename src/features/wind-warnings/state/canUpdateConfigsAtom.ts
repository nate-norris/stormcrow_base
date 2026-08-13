import { atom } from "jotai";

import { activeTestAtom } from "@/features/test-session";

export const canUpdateConfigsAtom = atom<boolean>((get) => {
    const test = get(activeTestAtom);
    return test !== null;
});