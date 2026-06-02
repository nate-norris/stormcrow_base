import { useAtom } from "jotai";

// TODO implement collapsible/dialog/sheet so that only qe count and type are visible
//  add Field to combine labels and inputs

import { activeTestAtom } from "@/features/test-session";
import DodicInput from "./input_dodic";
import LotInput from "./input_lot";
import QECountSpinner from "./qe_count";
import QETypeSelector from "./qe_type";
import AutoLog from "./auto_log";
import LogQE from "./log_qe";

export function QEForm() {

    const [test] = useAtom(activeTestAtom);

    return (
        <div className="m-6">
            <h2 className="text-center text-lg font-semibold">Current QE</h2>
            <div className="font-medium space-y-2 items-center bg-blue-500">
                <div>
                    <label>Test:</label>
                    <label>{test ? test.name : ""}</label>
                </div>
                <div className="flex">
                    <label>DODIC:</label>
                    <DodicInput />
                </div>
                <div className="flex">
                    <label>LOT:</label>
                    <LotInput />
                </div>
                <div className="flex">
                    <label>QE:</label>
                    <QECountSpinner />
                </div>
                <div className="flex">
                    <label>QE Type:</label>
                    <QETypeSelector />
                </div>
                <div>
                    <AutoLog />
                </div>
                <div>
                    <LogQE />
                </div>
            </div>
        </div>
    );
}