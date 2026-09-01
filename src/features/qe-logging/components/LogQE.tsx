import { useMemo } from "react";
import { useAtomValue } from "jotai";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import logQE from "../services/logQE";
import { doesQEExist, weatherRowsAtom } from "@/features/qe-table";
import { activeQEAtom } from "@/features/qe";

export default function LogQE() {
  const activeQE = useAtomValue(activeQEAtom);
  const weatherRows = useAtomValue(weatherRowsAtom);

  // updates badge warning on weatherRows or activeQE change
  const qeExists = useMemo(
    () => doesQEExist(activeQE, weatherRows),
    [weatherRows, activeQE]
  );

  const handleClick = async () => {
    try {
      await logQE();
    } catch (e) {
      console.log(e);
    }
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