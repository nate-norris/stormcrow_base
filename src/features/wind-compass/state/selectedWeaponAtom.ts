import { atom } from 'jotai'

import { WeaponKey, WEAPONS } from '../core/weaponKeys';
export const weaponSelectionAtom = atom<WeaponKey>(
    Object.keys(WEAPONS)[0] as WeaponKey
);