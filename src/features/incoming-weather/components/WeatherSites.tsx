
import { useAtom } from "jotai";
import { siteIdsAtom } from "../state/weatherObserversAtom";
import { SkeletonWeather } from "./SkeletonItem";
import { ScrollArea } from "@/components/ui/scroll-area"
import WeatherItem from "./WeatherItem";

export default function WeatherSites() {
    const [siteIds] = useAtom(siteIdsAtom);

    return (
        <ScrollArea>
            {siteIds.length === 0 ?
                (<SkeletonWeather />) :
                (
                    <div className="flex flex-wrap gap-3">
                        {siteIds.map(id => (
                            <WeatherItem key={id} siteId={id} />))
                        }
                    </div>
                )
            }
        </ScrollArea>
    );
}