import { WeatherObservation, Quadrant, CrossDoctrine, WeatherStatus, WindState } from '../core/models';

export const mockData = generateMockObservers();

function generateMockObservers(): Record<string, WeatherObservation> {
  return {
    "A": makeSiteA("A"),
    "B": makeSiteB("B"),
    "C": makeSiteC("C"),
    "D": makeSiteB("D"),
    "E": makeSiteC("E"),
  };
}

function makeSiteA(siteId: string): WeatherObservation {
  return {
    siteId: siteId,
    altitude: 700,
    windFull: 4.5,
    windDir: 234,
    temp: 82,
    humidity: 30.4,
    baro: 21.5,
    windCalcs: null,
    time: Date.now(),
    status: WeatherStatus.Receiving,
    windState: WindState.Critical
  };
}

function makeSiteB(siteId: string): WeatherObservation {
  return {
    siteId: siteId,
    altitude: 700,
    windFull: 4.5,
    windDir: 234,
    temp: 82,
    humidity: 30.4,
    baro: 21.5,
    windCalcs: null,
    time: Date.now(),
    status: WeatherStatus.Stale,
    windState: WindState.Warn
  };
}

function makeSiteC(siteId: string): WeatherObservation {
  return {
    siteId: siteId,
    altitude: 700,
    windFull: 4.5,
    windDir: 234,
    temp: 82,
    humidity: 30.4,
    baro: 21.5,
    windCalcs: null,
    time: Date.now(),
    status: WeatherStatus.NotReceiving,
    windState: WindState.Ok
  };
}