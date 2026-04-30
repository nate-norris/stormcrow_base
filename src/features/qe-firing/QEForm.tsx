import { useAtom } from "jotai";
import { lotAtom } from "@/atoms/logQEAtom";

import Dodic from "@/components/widgets/DodicInput";
import QETypeSelector from "@/components/widgets/QETypeSelector";
import QECountSpinner from "@/components/widgets/QECountSpinner";

export default function QEForm() {

    const [lot, setLot] = useAtom(lotAtom);

    function handleSubmit() {
        alert("clicked")
    }

    return (
        <div className="bg-zinc-400">
            <Dodic />
            <div>
                <label htmlFor="lot">LOT</label>
                <input type="text" id="lot" value={lot}
                    onChange={(e) => setLot(e.target.value)} />
            </div>
            <QETypeSelector />
            <QECountSpinner />
            <label htmlFor="logqe">OVERWRITING</label>
            <button className="bg-amber-400" id="logqe" onClick={handleSubmit}>
                Log QE
            </button>
        </div>
        
    );
}
