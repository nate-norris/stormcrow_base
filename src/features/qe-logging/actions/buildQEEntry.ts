import { store } from "@/state";

// atom inputs
import { activeTestAtom } from "@/features/test-session";
import { activeQEFormAtom } from "../state/loggingAtom";
import { activeWindConfigAtom } from "@/features/wind-warnings";
import { weatherObserversAtom } from "@/features/incoming-weather";
// types returned from input atoms
import type { Test } from "@/features/test-session";
import { QEFormState } from "../core/qe-form";
import type { WindWarningConfig } from "@/features/wind-warnings";
import type { WeatherObservers } from "@/features/incoming-weather";
// types required to build QEEntry
import { QEBase, QEConfiguration, SiteWeatherInput, QEEntry} from "../core/qe-log";

export function buildQEEntry(): QEEntry {
  // return active atom values needed for QEEntry
  const test: Test | null = store.get(activeTestAtom);
  const form: QEFormState = store.get(activeQEFormAtom);
  const warn_config: WindWarningConfig = store.get(activeWindConfigAtom);
  const observers: WeatherObservers = store.get(weatherObserversAtom);

  // TODO handle thrown error; propagate to UI
  if (!test) throw new Error("Test selection required to log QEs.");

  const base: QEBase = buildQEBase(test, form);
  const config: QEConfiguration = buildQEConfiguration(form, warn_config);
  const sites: SiteWeatherInput[] = buildSiteWeatherInputs(observers);
  
  return {
    base: base,
    config: config,
    sites: sites
  };
}

function buildQEBase(test: Test, form: QEFormState): QEBase {
  return {
    count: form.qeCount,
    qeType: form.qeType,
    testId: test.id,
  };
}

function buildQEConfiguration(form: QEFormState, windConfig: WindWarningConfig): 
  QEConfiguration {
  return {
    dodic: form.dodic,
    lot: form.lot,
    gunOrient: windConfig.gunOrient,
    time: Date.now(),
  };
}

function buildSiteWeatherInputs(observers: WeatherObservers): 
  SiteWeatherInput[] {
  return Object.values(observers).map(obs => ({
    siteId: Number(obs.siteId),
    altitude: obs.altitude,
    windFull: obs.windFull,
    windDirection: obs.windDir,
    cross: obs.cross,
    tail: obs.headTail,
    temp: obs.temp,
    humidity: obs.humidity,
    baro: obs.baro,
  }));
}