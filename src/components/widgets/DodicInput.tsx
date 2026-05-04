import { useAtom } from "jotai";
import { dodicAtom } from "@/state/logQEAtom";

// character matching for dodic regex
const dodicRegex: RegExp[] = [
    /^[A-Z]$/,
    /^[A-Z0-9]$/,
    /^[0-9]$/,
    /^[0-9]$/
];

export default function Dodic() {
    const [dodic, setDodic] = useAtom(dodicAtom);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let typed = e.target.value.toUpperCase();
        
        // confirm matches critera for dodic regex
        if (typed.length>0 && !(dodicRegex[typed.length-1].test(typed.slice(-1)) ||
            typed.length > 4)) return;

        setDodic(typed);
    }

    return (
        <>
            <label htmlFor="dodic">DODIC</label>
            <input type="text" id="dodic" value={dodic} onChange={handleChange} 
                placeholder="A062" maxLength={4} />
        </>
    );
}