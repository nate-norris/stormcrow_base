
import { useAtom } from "jotai";
import { getWeatherSiteAtom, siteIdsAtom } from "@/state/weather/";
import { SkeletonWeather } from "./SkeletonCard";
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatUnixToTime } from "./utils";



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
                            <WeatherCard key={id} siteId={id} />))
                        }
                    </div>
                )
            }
        </ScrollArea>
    );
}

function WeatherCard({ siteId }: { siteId: string }) {
    const [siteWeather] = useAtom(getWeatherSiteAtom(siteId));

    // NOTE: will never occur since parent is mapping siteId from an atom
    // but include for undefined occurance in getWeatherSiteAtom
    if (!siteWeather) return null;

    // TODO 
    // swap div for shadcn Item within ScrollArea
    // implement background color for siteWeather.status
    // implement windCalculations (cross/headtail/quad/cFactor/cType)
    // HoverCard shadcn: altitude, temp, humidity, baro
    // Popover shadcn: specify range on each site?
    // return text value of windState
    return (
        <div className="shadow-md rounded-2xl w-full">
            <h2 className="font-bold text-lg">{siteWeather.siteId}</h2>
            <span>{formatUnixToTime(siteWeather.time)}</span>
            <div>
                <span>{siteWeather.windFull} mph</span>
                <span>{siteWeather.windDir}°</span>
            </div>
            <div>
                <span></span>
            </div>
        </div>
    );
};