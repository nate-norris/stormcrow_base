import { useAtomValue } from "jotai";

import { cn } from "@/lib/utils";
import { activeWindConfigAtom } from "@/features/wind-warnings";
import { receivingSitesAtom } from "@/features/incoming-weather";

export function SitesConnectionStatus() {
  const expected = useAtomValue(activeWindConfigAtom).expectedSites;
  const receiving = useAtomValue(receivingSitesAtom);
  const isEquals = receiving === expected;

  return (
    <div>
      <span>Sites Receiving: </span>
      <span className={cn("text-muted-foreground",
        !isEquals ? "text-destructive" : ""
      )}>{receiving}/{expected}</span>
    </div>
  );
}