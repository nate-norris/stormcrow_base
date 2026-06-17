import { atom } from "jotai";

import type { WeatherRow } from "../core/weatherRow";

export const weatherRowsAtom = atom<WeatherRow[]>([]);