import { atom } from 'jotai'

import { compassDataAtom } from './compassAtom';

// delete compass vector by siteID
export const deleteCompassAtom = atom(
  null,
  (_get, set, siteId: string) => {
    set(compassDataAtom, prev => {
      const next = { ...prev };
      delete next[siteId];
      return next;
    });
  }
);