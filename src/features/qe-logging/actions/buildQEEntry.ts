// @ts-nocheck
// TODO remove once implemented

export function buildQEEntry(store): QEEntry {
  // what is the different of store.get vice useAtomValue?
  const form = store.get(qeFormAtom);
  const test = store.get(activeTestAtom);
  const sites = store.get(siteWeatherAtom);

  // if (!form || !test) {
  //   throw new Error("Cannot build QEEntry without form + test");
  // }

  return {

  };

  // return {
  //   base: {
  //     count: form.qeCount,
  //     qeType: form.qeType,
  //     testId: test.id,
  //   },

  //   config: {
  //     dodic: form.dodic,
  //     lot: form.lot,
  //     gunOrient: test.windConfig.gun_orient,
  //     time: Date.now(),
  //   },

  //   sites,
  // };
}