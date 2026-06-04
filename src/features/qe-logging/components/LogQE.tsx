import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import logQE from "../actions/logQE";

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
        <div className="flex flex-col gap-1">
            <Button onClick={handleClick} className="bg-blue-600">Log QE</Button>
            <Badge variant="destructive">Overwriting</Badge>
        </div>
    );
}