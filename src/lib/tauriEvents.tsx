import { Event, listen } from "@tauri-apps/api/event";
import type { WeatherPacket, WeatherObservation, WindCalcs } from "@/models";
import { getWindCalculations } from "./windCalculations";

type TauriEvents =  {
    weather: WeatherPacket;
    boom: null;
}

export async function initTauriListeners() {
    await listen<TauriEvents["weather"]>("weather", handleWeatherObservation);

    listen("weather", (event) => {
  weatherReducer.dispatch({
    type: "OBSERVATION_RECEIVED",
    payload: event.payload
  });
});
}

function handleWeatherObservation(event: Event<WeatherPacket>) {
    const raw: WeatherPacket = event.payload;
    const windTo = (raw.windDir + 180) % 360; // swap wind from to heading
    const c: WindCalcs = getWindCalculations(0, raw.windFull, windTo);

    // atom for current testing configuration
    const observation: WeatherObservation = {
        ...
    }

    const observation: WeatherObservation = {
        siteId: raw.siteId,
        time: new Date(),
        altitude: raw.altitude,
        windFull: raw.windFull,
        windDir: windTo,
        cross: 0,
        headTail: 0,
        temp: raw.temp,
        humidity: raw.humidity,
        baro: raw.baro
    }

    store.set(weatherAtom, (prev) => {{
        ...prev,
        [observation.siteId]: observation,
    }});
}
// get weather <data value=""></data>
//     <WeatherValue></WeatherValue>
//     push onto weather stack for multiple weather 
