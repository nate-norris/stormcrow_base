import { useAtom } from "jotai";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { lotAtom } from "../../state/derivedLoggingAtom";
import { isCompleteLotInput } from "./lotParser";

export default function LotInput() {
    const [lot, setLot] = useAtom(lotAtom);
    const [lotVisited, setLotVisited] = useState(false);

    return (
        <Input
            id="qe-lot"
            autoComplete="off"
            value={lot}
            onChange={(e) => setLot(e.target.value.toUpperCase())}
            onBlur={() => setLotVisited(true)}
            placeholder="LS-06E071H013BDW"
            maxLength={16}
            className={`${lotVisited && !isCompleteLotInput(lot) ? "border-red-500 border-2" : ""}
                bg-white`}
            />
    );
}