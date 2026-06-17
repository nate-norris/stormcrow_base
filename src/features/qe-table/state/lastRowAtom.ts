import { atom } from "jotai";

import { weatherRowsAtom } from "./weatherRowsAtom";
import type { WeatherRow } from "../core/weatherRow";

export const lastWeatherRowAtom = atom<WeatherRow | null>(get => {
    const rows = get(weatherRowsAtom);
    if (rows.length === 0) return null

    return rows.reduce((latest, row) =>
        row.time > latest.time ? row : latest
    );
});