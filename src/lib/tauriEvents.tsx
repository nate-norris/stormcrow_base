import { listen } from "@tauri-apps/api/event";
import { WeatherPacket } from "@/state";
import { weatherProcessor } from "./weatherProcessor";

type TauriEvents =  {
    weather: WeatherPacket;
    boom: null;
}

export async function initTauriListeners() {
    await listen<TauriEvents["weather"]>("weather", (event) => {
        console.log("Tauri event: weather listener");
        weatherProcessor.handlePacket(event.payload)
    });

    await listen<TauriEvents["boom"]>("boom", (_event) => {

    });
}
