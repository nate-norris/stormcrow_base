import { useAtom } from "jotai";

import { getWeatherSiteAtom } from "../state/weatherObserversAtom";
import { formatUnixToTime } from "./utils";

export default function WeatherItem({ siteId }: { siteId: string }) {
    const [siteWeather] = useAtom(getWeatherSiteAtom(siteId));

    // NOTE: will never occur since parent is mapping siteId from an atom
    // but include for undefined occurance in getWeatherSiteAtom
    if (!siteWeather) return null;

    // TODO 
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