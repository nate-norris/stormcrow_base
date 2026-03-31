
import { useAtom } from "jotai";
import { getWeatherSiteAtom, siteIdsAtom } from "@/state/weather/";

export default function WeatherSites() {
    const [siteIds] = useAtom(siteIdsAtom);

    if (siteIds.length === 0) {
        return (
            <div>
                <p>No Sites Receiving</p>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-4">
            {siteIds.map(id => (
                <WeatherCard key={id} siteId={id} />
            ))}
        </div>
    );
}

function WeatherCard({ siteId }: { siteId: string }) {
    const [siteWeather] = useAtom(getWeatherSiteAtom(siteId));

    // NOTE: will never occur since parent is mapping siteId from an atom
    // but include for undefined occurance in getWeatherSiteAtom
    if (!siteWeather) return null;

    return (
        <div className="p-4 border rounded shadow-md w-64">
            <h2 className="font-bold text-lg">{siteWeather.siteId}</h2>
            <p>ID: {siteWeather.siteId}</p>
            <p>Alt: {siteWeather.altitude}</p>
            <p>Wind Speed: {siteWeather.windFull} km/h</p>
            <p>Dir: {siteWeather.windDir}</p>
            <p>Temp: {siteWeather.temp}°C</p>
            <p>Hum: {siteWeather.humidity}</p>
            <p>Baro: {siteWeather.baro}</p>
            <p>cross: {siteWeather.siteId}</p>
            <p>headtail: {siteWeather.siteId}</p>
            <p>quad: {siteWeather.siteId}</p>
            <p>cFactor: {siteWeather.siteId}</p>
            <p>cType: {siteWeather.siteId}</p>
            <p>Time: {siteWeather.time}</p>
            <p>Status: {siteWeather.status}</p>
            <p>Wind State: {siteWeather.windState}</p>
            
        </div>
    );
};