import { useAtom } from "jotai";

import { activeTestAtom, dodicAtom, lotAtom, qeCountAtom, qeTypeAtom } from "@/state";
import { DodicInput } from "./widgets";
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
            <div className="mb-3">
                <DodicInput />
            </div>
        </div>
    );
}


// div className="bg-zinc-400">
//             <Dodic />
//             <div>
//                 <label htmlFor="lot">LOT</label>
//                 <input type="text" id="lot" value={lot}
//                     onChange={(e) => setLot(e.target.value)} />
//             </div>
//             <QETypeSelector />
//             <QECountSpinner />
//             <label htmlFor="logqe">OVERWRITING</label>
//             <button className="bg-amber-400" id="logqe" onClick={handleSubmit}>
//                 Log QE
//             </button>
//         </div>
        
//     );