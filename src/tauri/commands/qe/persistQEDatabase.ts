import { invoke } from "@tauri-apps/api/core";

import { store } from "@/state";
import type { WeatherRow } from "@/features/qe-table";
import { LoggingFormState } from "@/features/qe";
import { activeTestAtom, type Test } from "@/features/test-session";
import { activeWindConfigAtom, type WindWarningConfig } from "@/features/wind-warnings";
import { weatherObserversAtom, type WeatherObservers } from "@/features/incoming-weather";

import { QEEntry, QEConfiguration, SiteWeatherInput, QEBase } from "./types";

export async function persistQEDatabase(loggingForm: LoggingFormState): Promise<WeatherRow[] | null> {
  const test = store.get(activeTestAtom);
  const config = store.get(activeWindConfigAtom);
  const observers = store.get(weatherObserversAtom);

  try {
    // confirm clear to proceed
    // test is active
    // There is at least one WeatherObserver even if data is stale
    if (test == null || Object.keys(observers).length == 0) return null;

    const entry = buildQEEntry(test, config, loggingForm, observers);
    return await invoke<WeatherRow[]>("insert_new_qe_command", { newQe:  entry});
  } catch (err) {
    return null
  }
}

function buildQEEntry(test: Test, config: WindWarningConfig, 
  loggingForm: LoggingFormState, observers: WeatherObservers): QEEntry {
  const b: QEBase = {
    count: loggingForm.qe.count,
    qeType: loggingForm.qe.qeType,
    testId: test.id
  };
  const c: QEConfiguration = {
    dodic: loggingForm.dodic,
    lot: loggingForm.lot,
    gunOrient: config.gunOrient,
    time: Date.now()
  };
  const s: SiteWeatherInput[] = Object.values(observers).map(obs => ({
    siteId: obs.siteId,
    altitude: Math.round(obs.altitude),
    windFull: obs.windFull,
    windDirection: obs.windDir,
    cross: obs.windCalcs ? obs.windCalcs.cross : 0,
    tail: obs.windCalcs? obs.windCalcs.headTail: 0,
    temp: obs.temp,
    humidity: obs.humidity,
    baro: obs.baro,
  }));

  return {
    base: b,
    config: c,
    sites: s
  }
}