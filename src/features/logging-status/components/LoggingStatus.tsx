import { useAtomValue } from "jotai";

import { loggingStatusAtom } from "../state/loggingStatusAtom";

export function LoggingStatus() {
    const status = useAtomValue(loggingStatusAtom);

    return (
        <div>
            <div>Last QE {status.qeCount}{status.qeType}</div>
        </div>
    );
}