import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import logQE from "./actions/index";

// TODO: check overwrite based off testQEsAtom
export default function LogQE() {
    const handleClick = async () => {
        try {
            // TODO: set loading
            await logQE();
        } catch (e) {
            // TODO: error handle
        } // TODO add finally
    }

    return (
        <div className="flex flex-col items-center gap-1">
            <Badge variant="destructive">Overwriting</Badge>
            <Button onClick={handleClick} className="w-30">Log QE</Button>
        </div>
    );
}