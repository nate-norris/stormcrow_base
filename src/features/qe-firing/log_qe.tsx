import { useAtom } from "jotai";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// TODO: check overwrite based off testQEsAtom
export default function LogQE() {
    return (
        <div className="flex flex-col items-center gap-1">
            <Badge variant="destructive">Overwriting</Badge>
            <Button className="w-30">Log QE</Button>
        </div>
    );
}