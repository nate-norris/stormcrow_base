import { useAtom } from "jotai";

import { qeCountAtom } from "../state/qeCountAtom";
import { CountSpinner } from "./CountSpinner";

/**
 * Wrapper of CountSpinner component to directly update the activeQEAtom
 * through derived qeCountAtom.
 */
export function ActiveCountSpinner() {
    const [count, setCount] = useAtom(qeCountAtom);

    return (
        <CountSpinner
            value={count}
            onChange={setCount}
        />
    );
}