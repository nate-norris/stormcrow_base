import { useAtomValue } from "jotai";

import { lastWeatherRowAtom } from "@/features/qe-table";

export function LastQE() {
  const row = useAtomValue(lastWeatherRowAtom);
  const qeString = row ? row.count + row.qeType : "";
  return (
    <div>
      <span>Last QE: </span>
      <span className="text-muted-foreground">{qeString}</span>
    </div>
  );
}