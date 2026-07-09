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
        console.log("check", dto);
        // console.log("DTO windDirs: ", dto.windDir);
        return {
            siteId: String.fromCharCode(dto.siteId),
            altitude: dto.altitude,
            windFull: dto.windFull,
            windDir: dto.windDir, //Math.round(((dto.windDir + 180) % 360) * 10) / 10, //swap incoming direction
            temp: dto.temp,
            humidity: dto.humidity,
            baro: dto.baro,
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