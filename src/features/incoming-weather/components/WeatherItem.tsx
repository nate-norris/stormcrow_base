import { useAtomValue } from "jotai";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { weatherSiteAtomFamily } from "../state/weatherObserversAtom";
import { formatUnixToTime, formatReceivingStatusText, getStatusColor } 
    from "./utils";

export default function WeatherItem({ siteId }: { siteId: string }) {
    const siteWeather = useAtomValue(weatherSiteAtomFamily(siteId));

    // NOTE: will never occur since parent is mapping siteId from an atom
    // but include for undefined occurance in getWeatherSiteAtom
    if (!siteWeather) return null;

    // TODO 
    // implement windCalculations (cross/headtail/quad/cFactor/cType)
    // return text value of windState

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <div className={`
                    ${getStatusColor(siteWeather.status, siteWeather.windState)}
                    shadow-md rounded-2xl w-full p-3 text-xs`}>
                    <div className="flex justify-between mx-3">
                        <span className="font-bold text-sm">{siteWeather.siteId}</span>
                        <span>{formatUnixToTime(siteWeather.time)}</span>
                        <span className="px-2 py-0.5 mb-1 rounded bg-muted">
                            {formatReceivingStatusText(siteWeather.status)}
                        </span>
                    </div>
                    <div className="flex gap-2 justify-end">
                        {/* <WindIcon className="h-4 w-4" /> */}
                        <span>{siteWeather.windFull} mph</span>
                        <span>{siteWeather.windDir}° N</span>
                    </div>
                    <div className="flex items-center gap-4 justify-end">
                        
                        <span>→ {siteWeather.cross.toFixed(1)} mph</span>
                        <span>↑ {siteWeather.headTail.toFixed(1)} mph</span>
                    </div>
                </div>
            </HoverCardTrigger>
            <HoverCardContent
                side="right"
                align="center"
                sideOffset={-150}
                className="flex flex-col text-xs p-1 w-36">
                <div>Altitude: {siteWeather.altitude} m</div>
                <div>Temperature: {siteWeather.temp} °F</div>
                <div>Humidity: {siteWeather.humidity} %</div>
                <div>Barometer: {siteWeather.baro} inHg</div>
            </HoverCardContent>
        </HoverCard>    
    );
};