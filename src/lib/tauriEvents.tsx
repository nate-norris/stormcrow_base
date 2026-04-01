import { listen } from "@tauri-apps/api/event";
import { WeatherPacket } from "@/state";
import { weatherProcessor } from "./weatherProcessor";

/**
 * Data transfer object received on TauriEvent:weather.
 * The site_id on Rust will emit an event where site_id is type u8. This will 
 * be translated to UI compatible WeatherPacket and combined into 
 * WeatherObservation.
 */
export interface WeatherPayloadDTO {
  siteId: number;
  altitude: number;
  windFull: number;
  windDir: number;
  temp: number;
  humidity: number;
  baro: number;
}
export namespace WeatherPayloadDTO {
    // convert siteId to string so that u8 becomes char
    // id will come in as "A"/"B"/etc for each site
    export function toDomain(dto: WeatherPayloadDTO): WeatherPacket {
        return {
            siteId: String.fromCharCode(dto.siteId),
            altitude: dto.altitude,
            windFull: dto.windFull,
            windDir: dto.windDir,
            temp: dto.temp,
            humidity: dto.humidity,
            baro: dto.baro,
        };
    }
}

/**
 * Type of events that will arrive from Tauri events
 */
type TauriEvents =  {
    weather: WeatherPayloadDTO;
    boom: null;
}

/**
 * Initialize waiting for Tauri events.
 * 
 * Will translate event from list<T>() to proper domain type and pass to the
 * correct processor.
 * 
 * Events take the form:
 * type Event<T> = {
 *      event: string;
 *      payload: T;
 *      id: number;
 * }
 */
export async function initTauriListeners() {
    await listen<TauriEvents["weather"]>("weather", (event) => {
        const packet: WeatherPacket = WeatherPayloadDTO.toDomain(event.payload);
        weatherProcessor.handlePacket(packet);
    });

    await listen<TauriEvents["boom"]>("boom", (_event) => {

    });
}
