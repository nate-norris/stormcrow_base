import { useAtomValue } from "jotai";

import { cn } from "@/lib/utils";
import { overMaxWindAtom } from "@/features/incoming-weather";

export function SitesOverMax() {
  const overMax = useAtomValue(overMaxWindAtom);

  return (
    <div>
      <span>Over Max: </span>
      <span className={cn("text-muted-foreground",
        overMax != 0 ? "text-destructive" : ""
      )}>{overMax}</span>
    </div>
  );
}