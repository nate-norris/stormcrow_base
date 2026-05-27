// import { atom } from "jotai";

import { WeatherObservation, Quadrant, CrossDoctrine, WeatherStatus, WindState } from '../core/models';

export const mockData = generateMockObservers();
// export const mockWeatherObserversAtom = atom<Record<string, WeatherObservation>>(mockData);

function generateMockObservers(): Record<string, WeatherObservation> {
  return {
    "A": makeSiteA("A"),
    "B": makeSiteB("B"),
    "C": makeSiteC("C"),
    "D": makeSiteC("C"),
    "E": makeSiteC("C"),
    "F": makeSiteC("C"),
    "G": makeSiteC("C"),
    "H": makeSiteC("C"),
    "I": makeSiteC("C"),
    "J": makeSiteC("C"),
    "K": makeSiteC("C"),
    "L": makeSiteC("C"),
  };
}

function makeSiteA(siteId: string): WeatherObservation {
  return {
    siteId,
    altitude: 700,
    windFull: 4.5,
    windDir: 234,
    temp: 82,
    humidity: 30.4,
    baro: 21.5,
    cross: 3.4,
    headTail: 1.7,
    quadrant: Quadrant.StarboardHead,
    crossFactor: 0.5,
    crossType: CrossDoctrine.Half,
    time: Date.now(),
    status: WeatherStatus.Receiving,
    windState: WindState.Ok
  };
}

function makeSiteB(siteId: string): WeatherObservation {
  return {
    siteId,
    altitude: 700,
    windFull: 4.5,
    windDir: 234,
    temp: 82,
    humidity: 30.4,
    baro: 21.5,
    cross: 3.4,
    headTail: 1.7,
    quadrant: Quadrant.TailPort,
    crossFactor: 0.5,
    crossType: CrossDoctrine.Half,
    time: Date.now(),
    status: WeatherStatus.Receiving,
    windState: WindState.Warn
  };
}

function makeSiteC(siteId: string): WeatherObservation {
  return {
    siteId,
    altitude: 700,
    windFull: 4.5,
    windDir: 234,
    temp: 82,
    humidity: 30.4,
    baro: 21.5,
    cross: 3.4,
    headTail: 1.7,
    quadrant: Quadrant.TailStarboard,
    crossFactor: 0.5,
    crossType: CrossDoctrine.Half,
    time: Date.now(),
    status: WeatherStatus.Receiving,
    windState: WindState.Critical
  };
}