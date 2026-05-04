import { atom } from "jotai";

export const dodicAtom = atom<string>("");
export const lotAtom = atom<string>("");
export const qeCountAtom = atom<string>("1");
export const qeTypeAtom = atom<string>("");

//TODO overwrite DODIC on test change to null if not QEs for this test or last logged QE
/*
TODO
overwrite the above atoms upon activeTestAtomChange
if there are no QEs logged for the test then empty values for all
if there is at least one QE then for the last time stamped log
DODIC = last DODIC
LOT = last LOT
qeCount = last count + 1
qeType = last qeType (TR or WS)
*/