import { atom } from "jotai";

import { activeQEAtom } from "./activeQEAtom";

export const qeCountAtom = atom(
    get => get(activeQEAtom).count,

    (get, set, count: number) => {
        if (Number.isNaN(count) || count < 1) return;

        set(activeQEAtom, {
            ...get(activeQEAtom),
            count,
        });
    }
);