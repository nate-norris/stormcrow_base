import { useAtom } from "jotai";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { dodicAtom } from "../state/derivedLoggingAtom";
import { cn } from "@/lib/utils"

// character matching for dodic regex
const dodicRegex: RegExp[] = [
    /^[A-Z]$/,
    /^[A-Z0-9]$/,
    /^[0-9]$/,
    /^[0-9]$/
];

export default function DodicInput() {
    const [dodic, setDodic] = useAtom(dodicAtom);
    const [dodicVisited, setDodicVisited] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let typed = e.target.value.toUpperCase();
        
        // confirm matches critera for dodic regex
        if (typed.length > 0 && 
            !(matchesDODICRegexPartial(typed) || typed.length > 4)) 
            return;

        setDodic(typed);
    }

    return (
        <Input
            id="qe-dodic" 
            autoComplete="off"
            value={dodic}
            onChange={handleChange}
            onBlur={() => setDodicVisited(true)}
            placeholder="A062" 
            maxLength={4}
            className={cn(
                "bg-white",
                "focus-visible:ring-0",
                "transition-none",
                dodicVisited && !isCompleteDODICInput(dodic) && "border-red-500 border-2"
            )}
        />
    );
}

function matchesDODICRegexPartial(text: string): boolean {
    return dodicRegex[text.length-1].test(text.slice(-1))
}

export function isCompleteDODICInput(text: string): boolean {
    return text.length === 4 &&
        matchesDODICRegexPartial(text);
}