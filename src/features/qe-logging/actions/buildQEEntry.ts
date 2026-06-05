// input types
import type { QEInputs } from "../core/qe_inputs";
import type { Test } from "@/features/test-session";
import { QEFormState } from "../core/qe-form";
import type { WindWarningConfig } from "@/features/wind-warnings";
import type { WeatherObservers } from "@/features/incoming-weather";
// types required to build QEEntry
import type { QEBase, QEConfiguration, SiteWeatherInput, QEEntry} 
  from "../core/qe-log";

export default function buildQEEntry(storeInputs: QEInputs): QEEntry {
  // TODO handle thrown error; propagate to UI
  if (!storeInputs.test) 
    throw new Error("Test selection required to log QEs.");

  const base: QEBase = buildQEBase(storeInputs.test, storeInputs.qeForm);
  const config: QEConfiguration = buildQEConfiguration(storeInputs.qeForm, 
    storeInputs.warnConfig);
  const sites: SiteWeatherInput[] = 
    buildSiteWeatherInputs(storeInputs.observers);
  
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