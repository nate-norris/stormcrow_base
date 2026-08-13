
import { useAtom } from "jotai";

import { sortedSiteIdsAtom } from "../state/sortedWeatherAtom";
import { SkeletonWeather } from "./SkeletonItem";
import WeatherItem from "./WeatherItem";

export default function WeatherSites() {
    const [siteIds] = useAtom(sortedSiteIdsAtom);

    return (
        <div className="
            max-h-96 overflow-auto
            [&::-webkit-scrollbar]:w-1
            [&::-webkit-scrollbar-thumb]:bg-transparent
            [&::-webkit-scrollbar-track]:bg-transparent
            hover:[&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-white/20"
        >
            {siteIds.length === 0 ?
                (<SkeletonWeather />) :
                (
                    <div className="flex flex-wrap gap-3 pr-4">
                        {siteIds.map(id => (
                            <WeatherItem key={id} siteId={id} />))
                        }
                    </div>
                )
            }
        </div>
    );
}