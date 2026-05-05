import { useAtom } from "jotai";

// TODO implement collapsible/dialog/sheet so that only qe count and type are visible
//  add Field to combine labels and inputs

import { activeTestAtom, qeCountAtom, qeTypeAtom } from "@/state";
import DodicInput from "./input_dodic";
import LotInput from "./input_lot";
import QECountSpinner from "./qe_count";
import QETypeSelector from "./qe_type";
import AutoLog from "./auto_log";

export function QEForm() {

    const [test] = useAtom(activeTestAtom);

    function handleSubmit() {
        alert("clicked")
    }

    return (
        <div className="p-4">
            <h2 className="text-center text-xl font-semibold mb-4">
                Current QE
            </h2>

            <div className="mb-2">
                <span className="font-medium">Test: </span>
                <span>{test ? test.name : ""}</span>
            </div>

            <div className="mb-3 flex items-center gap-2">
                <label className="font-medium" htmlFor="dodic">DODIC: </label>
                <DodicInput />
            </div>

            <div className="mb-4 flex items-center gap-2">
                <label className="font-medium" htmlFor="lot">Lot: </label>
                <LotInput />
            </div>

            <div className="mb-3 flex items-center gap-2">
                <label className="font-medium" htmlFor="count">QE: </label>
                <QECountSpinner />
            </div>

            <div className="mb-3 flex items-center gap-2">
                <label className="font-medium" htmlFor="qtype">QE Type: </label>
                <QETypeSelector />
            </div>

            <div>
                <AutoLog />
            </div>
        </div>
    );
}