import { store } from "@/state/store"

import { type WeatherPacket, type WindCalcs, type WeatherObservation, WeatherStatus } from "./models";
import { updateWeatherObserverAtom } from "../state/updateWeatherObserverAtom";
import { deleteWeatherObserverAtom } from "../state/deleteWeatherObserverAtom";
import { activeWindConfigAtom } from "@/features/wind-warnings";
import { updateWindLogAtom, deleteWindLogAtom } from "@/features/wind-log";
import { getWindCalculations, getWindState } from "./windCalculations";

export default class WeatherStreamProcessor {
    private timers = new Map<string, ReturnType<typeof setTimeout>>();

    handlePacket(packet: WeatherPacket) {
        const warnConfig = store.get(activeWindConfigAtom);
        const calcs: WindCalcs = getWindCalculations(warnConfig.gunOrient, packet.windFull, warnConfig);

        const observation: WeatherObservation = {
            ...packet,
            ...calcs,
            time: Date.now(),
            status: WeatherStatus.Receiving,
            windState: getWindState(calcs, warnConfig.maxWind, warnConfig.thresholdPercent),
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
        store.set(updateWeatherObserverAtom, {
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
        store.set(updateWeatherObserverAtom, {
            type: "status",
            siteId: siteId,
            status: WeatherStatus.Stale,
        });

        // warn in 30 seconds total of not receiving
        this.updateTimer(siteId, 25_000, this.timeoutError);
    }

    
    private timeoutError = (siteId: string) => {
        // make status not receiving
        store.set(updateWeatherObserverAtom, {
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