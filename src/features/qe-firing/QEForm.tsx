import { useAtom } from "jotai";

import { activeTestAtom, dodicAtom, lotAtom, qeCountAtom, qeTypeAtom } from "@/state";
import DodicInput from "./input_dodic";
import LotInput from "./input_lot";
// import { lotAtom } from "@/atoms/logQEAtom";

// import Dodic from "@/components/widgets/DodicInput";
// import QETypeSelector from "@/components/widgets/QETypeSelector";
// import QECountSpinner from "@/components/widgets/QECountSpinner";

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

            <div className="mb3 flex items-center gap-2">
                <label className="font-medium" htmlFor="lot">Lot: </label>
                <LotInput />
            </div>
        </div>
    );
}