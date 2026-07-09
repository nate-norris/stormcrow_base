import { listen } from "@tauri-apps/api/event";

import { type WeatherPacket, weatherProcessor } from "@/features/incoming-weather";
import { TauriEventHandler } from "./models";

/**
 * Data transfer object received on TauriEvent:weather.
 * The site_id on Rust will emit an event where site_id is type u8. This will 
 * be translated to UI compatible WeatherPacket and combined into 
 * WeatherObservation.
 */
interface WeatherEventDTO {
  siteId: number;
  altitude: number;
  windFull: number;
  windDir: number;
  temp: number;
  humidity: number;
  baro: number;
}
namespace WeatherEventDTO {
    // convert siteId to string so that u8 becomes char
    // id will come in as "A"/"B"/etc for each site
    export function toDomain(dto: WeatherEventDTO): WeatherPacket {
        return {
            siteId: String.fromCharCode(dto.siteId),
            altitude: dto.altitude,
            windFull: dto.windFull,
            windDir: dto.windDir, //Math.round(((dto.windDir + 180) % 360) * 10) / 10, //swap incoming direction
            temp: Math.round(((dto.temp * (9/5)) + 32) * 10) / 10, // convert celcius to fahrenheit
            humidity: dto.humidity,
            baro: Math.round(dto.baro * 100) / 100,
        };
    }
}

export const weatherHandler: TauriEventHandler = {
    async register() {
        await listen<WeatherEventDTO>("weather", (event) => {
            const packet: WeatherPacket = WeatherEventDTO.toDomain(event.payload);
            weatherProcessor.handlePacket(packet);
        });
    }
}