import { useAtomValue } from "jotai";

import { siteIdsAtom } from "@/features/incoming-weather";
import { SITE_COLORS } from "@/lib/siteColors";

export function WindLegend() {
  const siteIds = useAtomValue(siteIdsAtom);

  return (
    <div className="pt-2 h-full w-full overflow-y-auto flex flex-col gap-2
        [scrollbar-width:none]
        hover:[scrollbar-width:thin]
        [&::-webkit-scrollbar]:w-0
        hover:[&::-webkit-scrollbar]:w-1
        hover:[&::-webkit-scrollbar-thumb]:rounded-full
        hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
      {siteIds.map(siteId => (
        <div key={siteId} className="flex items-center gap-2">
          <div
            className="w-4 h-1 rounded"
            style={{ backgroundColor: SITE_COLORS[siteId] }}
          />
          <span className="text-md text-white">
            {siteId}
          </span>
        </div>
      ))}
    </div>
  );
}