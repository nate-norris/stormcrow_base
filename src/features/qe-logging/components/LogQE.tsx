import { useMemo } from "react";
import { useAtomValue } from "jotai";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import logQE from "../services/logQE";

import { qeCountAtom, qeTypeAtom } from "../state/derivedLoggingAtom";
import { weatherRowsAtom } from "@/features/qe-table";

export default function LogQE() {
    const qeCount = useAtomValue(qeCountAtom);
    const qeType = useAtomValue(qeTypeAtom);
    const weatherRows = useAtomValue(weatherRowsAtom);

    const qeExists = useMemo(() => {
        return weatherRows.some(
            row =>
                row.count === qeCount &&
                row.qeType === qeType
        );
    }, [qeCount, qeType, weatherRows]);

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
            <Button onClick={handleClick}>Log QE</Button>
            {qeExists && (
                <Badge variant="destructive">Overwriting</Badge>
            )}
        </div>
    );
}