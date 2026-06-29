import { atom } from 'jotai'

import type { WindEvent } from "../core/windEvent";

export type WindLog = Record<string, WindEvent>;
export const windLogAtom = atom<WindLog>({});