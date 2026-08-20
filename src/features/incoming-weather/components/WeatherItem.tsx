import { useAtomValue } from "jotai";
import { RadioTowerIcon, CloudLightningIcon } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { cn } from "@/lib/utils";
import { weatherSiteAtomFamily } from "../state/weatherSiteAtomFamily";
import { formatUnixToTime, formatReceivingStatusText, 
    getReceivingStatusColor, getWindStateColor } from "./utils";
import { SITE_COLORS } from "@/lib/siteColors";

export default function WeatherItem({ siteId }: { siteId: string }) {
    const siteWeather = useAtomValue(weatherSiteAtomFamily(siteId));

    // NOTE: will never occur since parent is mapping siteId from an atom
    // but include for undefined occurance in getWeatherSiteAtom
    if (!siteWeather) return null;

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <div className="shadow-md rounded-2xl w-full p-3 text-xs 
                    bg-panel text-panel-foreground hover:hover:bg-panel-accent">
                    <div className="flex justify-between mx-2.5 gap-3 items-center">
                        {/* site identifier */}
                        <div
                            className="inline-flex size-10 items-center 
                            justify-center rounded-full text-sm font-bold 
                            text-secondary-foreground"
                            style={{ backgroundColor: SITE_COLORS[siteWeather.siteId] }}
                        >
                            {siteWeather.siteId}
                        </div>
                        

                        <div className="flex flex-col justify-center 
                            items-stretch gap-y-2 pr-2 border-r-2 
                            border-foreground"
                        >
                            {/* site receiving status */}
                            <span
                                className={cn(
                                    getReceivingStatusColor(siteWeather.status),
                                    "px-2 py-1 mb-1 rounded-full flex flex-1 justify-center text-status-foreground"
                                )}
                            >
                                <RadioTowerIcon className="h-4 w-4 mr-2 text-status-foreground" />
                                {formatReceivingStatusText(siteWeather.status)}
                            </span>
                            {/* wind warning status */}
                            <span
                                className={cn(
                                    getWindStateColor(siteWeather.windState),
                                    "px-2 py-1 mb-1 rounded-full flex flex-1 justify-center text-status-foreground"
                                )}
                            >
                                <CloudLightningIcon className="h-4 w-4 mr-2 text-status-foreground" />
                                Wind
                            </span>
                        </div>

                        {/* wind full/cross/headtail and degrees plus warning sign */}
                        <div className="flex flex-1 flex-col justify-center items-start">
                            <div className="space-y-2">

                                {/* Rows 1 & 2 */}
                                <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 border-b border-foreground">
                                    <span>Full:</span>
                                    <span>{siteWeather.windFull} m/s</span>

                                    <span>Degrees:</span>
                                    <span>{siteWeather.windDir}° N</span>
                                </div>

                                {/* Row 3 */}
                                <div className="grid grid-cols-2 text-center gap-2">
                                    <span>→ {siteWeather.windCalcs ? siteWeather.windCalcs.cross.toFixed(1) : "?"} m/s</span>
                                    <span>↑ {siteWeather.windCalcs ? siteWeather.windCalcs.headTail.toFixed(1): "?"} m/s</span>
                                </div>

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