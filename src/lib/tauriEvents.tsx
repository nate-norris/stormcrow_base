import { Event, listen } from "@tauri-apps/api/event";
// import type { WeatherPacket, WeatherObservation, WindCalcs } from "@/models";
// import { getWindCalculations } from "./windCalculations";
// import { WeatherReducer } from "@/atoms"
import { WeatherStreamProcessor, WeatherPacket } from "@/state";

type TauriEvents =  {
    weather: WeatherPacket;
    boom: null;
}

export async function initTauriListeners() {
    const weatherProcessor = new WeatherStreamProcessor();
    await listen<TauriEvents["weather"]>("weather", (event) => {
        weatherProcessor.handlePacket(event.payload)
    });
}
