import { useMemo } from "react";
import { useAtomValue } from "jotai";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import logQE from "../actions/logQE";
import { type QEKey } from "@/features/qe-table";

import { qeCountAtom, qeTypeAtom } from "../state/derivedLoggingAtom";
import { qeEntriesAtom } from "@/features/qe-table/state/qeEntries";

// TODO: check overwrite based off testQEsAtom
export default function LogQE() {
    const qeCount = useAtomValue(qeCountAtom);
    const qeType = useAtomValue(qeTypeAtom);
    const qeEntries = useAtomValue(qeEntriesAtom);

    const qeExists = useMemo(() => {
        return qeEntries.some(
            row =>
                row.count === qeCount &&
                row.qeType === qeType
        );
    }, [qeCount, qeType, qeEntries]);

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
            {qeExists && (
                <Badge variant="destructive">Overwriting</Badge>
            )}
        </div>
    );
}