import { atom } from "jotai";

import { WeatherObservation, Quadrant, CrossDoctrine, WeatherStatus, WindState } from '../core/models';

const mockData = generateMockObservers();
export const mockWeatherObserversAtom = atom<Record<string, WeatherObservation>>(mockData);

function generateMockObservers(): Record<string, WeatherObservation> {
  return {
    "A": makeSite("A"),
    "B": makeSite("B"),
    "C": makeSite("C"),
  };
}

function makeSite(siteId: string): WeatherObservation {
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