import { atom } from "jotai";
import { QEFormState, defaultQEFormValues } from "../core/qe-form";

export const activeQEFormAtom = atom<QEFormState>(defaultQEFormValues);

/*
TODO
ensure activeQEFormAtom states below are implemented

State 1
No test selected
activeTestAtom = null
QE form isn't shown.

State 2
Test selected, no QE logged yet
activeTestAtom = test
qeFormAtom = {
  dodic: "",
  lot: "",
  qeCount: 1,
  qeType: "TR"
}
Form is shown.

State 3
Test selected, previous QE exists
activeTestAtom = test
qeFormAtom = {
  dodic: lastQe.dodic,
  lot: lastQe.lot,
  qeCount: lastQe.qeCount + 1,
  qeType: lastQe.qeType
}
Form is shown
*/