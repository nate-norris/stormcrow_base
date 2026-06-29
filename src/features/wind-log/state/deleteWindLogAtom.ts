import { atom } from 'jotai'

import { windLogAtom } from './windLogAtom';

// delete wind value tracking
export const deleteWindLogAtom = atom(
  null,
  (_get, set, siteId: string) => {
    set(windLogAtom, prev => {
      const next = { ...prev };
      delete next[siteId];
      return next;
    });
  }
);