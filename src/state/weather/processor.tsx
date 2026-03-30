import { store } from "@/state/store"
import { WeatherPacket, WindCalcs, WeatherObservation, WeatherStatus } from "./models";
import { updateWeatherObserversAtom, deleteWeatherObserverAtom, 
    updateWindLogAtom, deleteWindLogAtom } from "./atomPrimary";
import { getWindCalculations, getWindState } from "./windCalculations";

export class WeatherStreamProcessor {
    private timers = new Map<string, ReturnType<typeof setTimeout>>();

    handlePacket(packet: WeatherPacket) {
        const windTo = (packet.windDir + 180) % 360;
        // TODO: get weapon orientation from state
        const weapon_orientation = 0;
        const calcs: WindCalcs = getWindCalculations(weapon_orientation, packet.windFull, windTo);

        const observation: WeatherObservation = {
            ...packet,
            ...calcs,
            windFull: windTo,
            time: Date.now(),
            status: WeatherStatus.Receiving,
            wind_state: getWindState(calcs, 10, .75), // TODO get from state
        }

        this.publish(observation);
        this.resetTimeout(observation.siteId);
    }

    removeSite(siteId: string) {
        // clear and delte timer
        const existing = this.timers.get(siteId);
        if (existing) {
            clearTimeout(existing);
            this.timers.delete(siteId);
        }

        store.set(deleteWeatherObserverAtom, siteId);
        store.set(deleteWindLogAtom, siteId);
    }

    private publish(obs: WeatherObservation) {
        console.log("publishing weather observation");
        console.log(obs);
        store.set(updateWeatherObserversAtom, {
            type: "observation",
            data: obs,
        });
        store.set(updateWindLogAtom, obs);
    }

    private resetTimeout(siteId: string) {
        // warn in 5 seconds of stale data
        this.updateTimer(siteId, 5_000, this.timeoutWarn);
    }

    private timeoutWarn = (siteId: string) => {
        // make status stale
        store.set(updateWeatherObserversAtom, {
            type: "status",
            siteId: siteId,
            status: WeatherStatus.Stale,
        });

        // warn in 30 seconds total of not receiving
        this.updateTimer(siteId, 25_000, this.timeoutError);
    }

    
    private timeoutError = (siteId: string) => {
        // make status not receiving
        store.set(updateWeatherObserversAtom, {
            type: "status",
            siteId: siteId,
            status: WeatherStatus.NotReceiving,
        });
    }

    // Helper function to clear and set the next timeout of the timer by siteId.
    //
    // NOTE: Functions passed as arguments must be declared as arrow functions 
    // since class context is lost when method is passed as function
    private updateTimer(siteId: string, timeout: number, fn: (siteId: string)  => void) {
        // clear timer
        const existing = this.timers.get(siteId);
        if (existing) clearTimeout(existing);
        // update new timer
        this.timers.set(siteId, 
            setTimeout(() => { fn(siteId); }, timeout)
        );
    }
}