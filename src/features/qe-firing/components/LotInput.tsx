import { useAtom } from "jotai";
import { Input } from "@/components/ui/input";
import { lotAtom } from "../state/derivedLoggingAtom";

export default function LotInput() {
    const [lot, setLot] = useAtom(lotAtom);

    return (
        <Input
            id="lot"  
            value={lot}
            onChange={(e) => setLot(e.target.value.toUpperCase())}
            placeholder="LS-06E071H013BDW"
            maxLength={16}
            className="w-60"
            />
    );
}