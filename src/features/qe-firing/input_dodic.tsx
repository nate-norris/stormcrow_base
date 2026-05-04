import { useAtom } from "jotai";

import { Input } from "@/components/ui/input";
import { dodicAtom } from "@/state/logQEAtom";

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
            !(dodicRegex[typed.length-1].test(typed.slice(-1)) || typed.length > 4)) 
            return;

        setDodic(typed);
    }

    return (
        <div className="flex items-center gap-2">
            <label className="font-medium" htmlFor="dodic">DODIC: </label>
            <Input
              id="dodic"  
              value={dodic}
              onChange={handleChange}
              placeholder="A062" 
              maxLength={4}
              className="w-24"
              />
        </div>
    );
}