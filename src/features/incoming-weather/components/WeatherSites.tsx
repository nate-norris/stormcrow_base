
import { useAtom } from "jotai";
import { siteIdsAtom } from "../state/atomDerived";
import { SkeletonWeather } from "./SkeletonItem";
import { ScrollArea } from "@/components/ui/scroll-area"
import WeatherItem from "./WeatherItem";

export default function WeatherSites() {
    const [siteIds] = useAtom(siteIdsAtom);

    return (
        <ScrollArea className="w-1/5 max-w-96 min-w-64
        p-4
        rounded-md border-2">
            {siteIds.length === 0 ?
                (<SkeletonWeather />) :
                (
                    <div className="flex flex-wrap gap-4">
                        {siteIds.map(id => (
                            <WeatherItem key={id} siteId={id} />))
                        }
                    </div>
                )
            }
        </ScrollArea>
    );
}

