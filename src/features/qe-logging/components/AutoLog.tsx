import { useAtom } from "jotai";
import { Crosshair } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";
import { autoLogAtom } from "../state/autoLogAtom";

export default function AutoLog() {
    const [autoLog, setAutoLog] = useAtom(autoLogAtom);

    return (
         <Toggle
            pressed={autoLog}
            onPressedChange={setAutoLog}
            aria-label="Auto Log" size="default" variant="outline"
            className="data-[state=on]:bg-status-danger data-[state=on]:text-status-foreground"
            >
            <Crosshair />
            Auto Log QE
        </Toggle>
    )
}