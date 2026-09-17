import { useMemo } from "react";
import { useAtomValue } from "jotai";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { doesQEExist, weatherRowsAtom } from "@/features/qe-table";
import { activeQEAtom } from "@/features/qe";

import { logQE } from "../services/logQE";

/**
 * Component initiating logging action for QE.
 * 
 * Warns users if current active qe already exists in previously logged
 * QEs.
 */
export default function LogQEButton() {
  const activeQE = useAtomValue(activeQEAtom);
  const weatherRows = useAtomValue(weatherRowsAtom);

  // updates badge warning on weatherRows or activeQE change
  const qeExists = useMemo(
    () => doesQEExist(activeQE, weatherRows),
    [weatherRows, activeQE]
  );

  async function handleConfirm() {
    await logQE();
  }

  return (
    <div className="flex flex-col gap-1">
      <Button onClick={handleConfirm}>Log QE</Button>
      {qeExists && (
        <Badge variant="destructive">Overwriting</Badge>
      )}
    </div>
  );
}
