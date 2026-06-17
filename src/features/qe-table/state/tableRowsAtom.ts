import { atom } from "jotai";

import { weatherRowsAtom } from "./weatherRowsAtom";
import { QETableRow } from "../core/tableRow";

export const qeTableRowsAtom = atom<QETableRow[]>((get) => {
    return get(weatherRowsAtom).map((obs) => {
        return {
            id: `${obs.count}${obs.qeType}-${obs.siteId}`,
            qeKey: `${obs.count}${obs.qeType}`,
            dodic: obs.dodic,
            lot: obs.lot,
            siteId: obs.siteId,
            windFull: obs.windFull,
            windDirection: obs.windDirection,
            temp: obs.temp,
            humidity: obs.humidity,
            baro: obs.baro,
            time: obs.time,
        };
    });
});