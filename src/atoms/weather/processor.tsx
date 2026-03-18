import { WeatherPacket, WindCalcs, WeatherObservation, WeatherStatus } from "./models";
import { getWindCalculations } from "./windCalculations";

export class WeatherProcessor {
    // private state = new Map<string, WeatherState>();
    // private timers = new Map<string, ReturnType<typeof setTimeout>>();

    // dispatch(event: WeatherPacketEvent) {
    //     switch (event.type) {
    //         case WeatherPacketEventType.Received:
    //             this.handleObservation(event.observation);
    //             break;
    //         case WeatherPacketEventType.Timeout:
    //             this.handleTimeout(event.siteId);
    //             break;
    //     }

    //     this.emit();
    // }
    handlePacket(packet: WeatherPacket) {
        const windTo = (packet.windDir + 180) % 360;
        const calcs: WindCalcs = getWindCalculations(0, packet.windFull, windTo);

        const observation: WeatherObservation = {
            ...packet,
            ...calcs,
            windFull: windTo,
            time: Date.now(),
            status: WeatherStatus.Receiving,
        }
    }

    private publish(obs: WeatherObservation) {
        store.set(weatherAtom, prev => ({
            ...prev,
            [obs.siteId]: obs,
        }));



    // emit() {

    // }

    // handleObservation(observation: WeatherObservation) {
    //     const now = Date.now();

    //     const current: WeatherState = {
    //         siteId: 
    //     }
    // }

    // handleTimeout(siteId: string) {

    // }
}

/*
function handleWeatherObservation(event: Event<WeatherPacket>) {
    const raw: WeatherPacket = event.payload;
    const windTo = (raw.windDir + 180) % 360; // swap wind from to heading
    const c: WindCalcs = getWindCalculations(0, raw.windFull, windTo);

    // atom for current testing configuration
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
*/