
import { useState } from "react";

// character matching for dodic regex
const dodicRegex: RegExp[] = [
    /^[A-Z]$/,
    /^[A-Z0-9]$/,
    /^[0-9]$/,
    /^[0-9]$/
];

// TODO pass dodic as object from caller say formVals.dodic
export default function Dodic() {
    const [dodic, setDodic] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let typed = e.target.value.toUpperCase();
        
        // confirm matches critera for dodic regex
        if (typed.length>0 && !(dodicRegex[typed.length-1].test(typed.slice(-1)) ||
            typed.length > 4)) return;

        setDodic(typed);
    }

    return (
        <div>
            <label htmlFor="dodic">DODIC</label>
            <input type="text" id="dodic" value={dodic} onChange={handleChange} 
                placeholder="A062" maxLength={4} />
        </div>
    )
}