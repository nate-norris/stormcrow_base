import { atom } from 'jotai'

import type { CompassEvent } from '../core/compassEvent';

export type CompassData = Record<string, CompassEvent>;
export const compassDataAtom = atom<CompassData>({});