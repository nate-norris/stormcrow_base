import { atom } from "jotai";

import { WeatherRow } from "@/features/qe-logging";

export const qeEntriesAtom = atom<WeatherRow[]>([]);