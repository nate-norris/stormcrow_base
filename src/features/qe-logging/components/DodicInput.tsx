import { useAtom } from "jotai";

import { Input } from "@/components/ui/input";
import { dodicAtom } from "../state/derivedLoggingAtom";

// character matching for dodic regex
const dodicRegex: RegExp[] = [
    /^[A-Z]$/,
    /^[A-Z0-9]$/,
    /^[0-9]$/,
    /^[0-9]$/
];

export default function DodicInput() {
    const [dodic, setDodic] = useAtom(dodicAtom);

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
            placeholder="A062" 
            maxLength={4}
            className="bg-white"
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