

import Dodic from "@/components/widgets/DodicInput";
import QETypeSelector from "@/components/widgets/QETypeSelector";
import QECountSpinner from "@/components/widgets/QECountSpinner";
import LogQEButton from "@/components/widgets/LogQEButton";

export default function QEForm() {



    return (
        <div className="bg-zinc-400">
            <Dodic />
            <div>
                <label htmlFor="lot">LOT</label>
                <input type="text" id="lot" />
            </div>
            <QETypeSelector />
            <QECountSpinner />
            <LogQEButton />
        </div>
        
    );
}
