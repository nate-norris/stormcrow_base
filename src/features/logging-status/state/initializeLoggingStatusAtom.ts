import { atom } from "jotai";

import { loggingStatusAtom } from "./loggingStatusAtom";
import { type WeatherRow } from "@/features/qe-table";
import { type QEType } from "@/features/qe-logging";

export const initializeLoggingStatusAtom = atom(
    null,
    (_get, set, lastWeather: WeatherRow | null) => {
        set(loggingStatusAtom, {
            qeCount: lastWeather?.count ?? null,
            qeType: lastWeather
                ? lastWeather.qeType as QEType
                : null,
        });
    }
);