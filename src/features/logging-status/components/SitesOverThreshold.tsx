import { useAtomValue } from "jotai";

import { cn } from "@/lib/utils";
import { overThresholdWindAtom } from "@/features/incoming-weather";

export function SitesOverThreshold() {
  const overThresh = useAtomValue(overThresholdWindAtom);

  return (
    <div>
      <span>Over Threshold: </span>
      <span className={cn("text-muted-foreground",
        overThresh != 0 ? "text-destructive" : ""
      )}>{overThresh}</span>
    </div>
  );
}