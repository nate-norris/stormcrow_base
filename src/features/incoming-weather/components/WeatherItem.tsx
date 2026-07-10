import { useAtomValue } from "jotai";
import { RadioTowerIcon, CloudRainWindIcon } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { weatherSiteAtomFamily } from "../state/weatherSiteAtomFamily";
import { formatUnixToTime, formatReceivingStatusText, 
    getReceivingStatusColor, getWindStateColor } from "./utils";

export default function WeatherItem({ siteId }: { siteId: string }) {
    const siteWeather = useAtomValue(weatherSiteAtomFamily(siteId));

    // NOTE: will never occur since parent is mapping siteId from an atom
    // but include for undefined occurance in getWeatherSiteAtom
    if (!siteWeather) return null;

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <div className="shadow-md rounded-2xl w-full p-3 text-xs bg-gray-400">
                    <div className="flex justify-between mx-3">
                        <span className="font-bold text-sm">{siteWeather.siteId}</span>
                        <span className="mt-0.5">{formatUnixToTime(siteWeather.time)}</span>
                        <span className={`
                            ${getReceivingStatusColor(siteWeather.status)}
                            px-2 py-0.5 mb-1 rounded-full flex w-30 
                            justify-center text-white`}>
                            <RadioTowerIcon className="h-4 w-4 mr-2 text-white" />
                            {formatReceivingStatusText(siteWeather.status)}
                        </span>
                    </div>
                    <div className="mt-1 flex justify-end gap-3">
                        <div
                            className={`
                                ${siteWeather.windState ? getWindStateColor(siteWeather.windState) : "bg-blue-400"}
                                flex h-8 w-8 shrink-0 items-center
                                justify-center rounded-full
                            `}>
                            <CloudRainWindIcon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="flex gap-2">
                                <span>{siteWeather.windFull} m/s</span>
                                <span>{siteWeather.windDir}° N</span>
                            </div>
                            <div className="flex gap-2">
                                <span>→ {siteWeather.windCalcs ? siteWeather.windCalcs.cross.toFixed(1) : "?"} m/s</span>
                                <span>↑ {siteWeather.windCalcs ? siteWeather.windCalcs.headTail.toFixed(1): "?"} m/s</span>
                            </div>
                        </div>
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