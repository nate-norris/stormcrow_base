import { WeatherObservation, Quadrant, CrossDoctrine, WeatherStatus, WindState } from '../core/models';

export const mockData = generateMockObservers();

function generateMockObservers(): Record<string, WeatherObservation> {
  const observers: Record<string, WeatherObservation> = {};

  for (const siteId of "ABCDEFGH") { //ABCDEFGHIJKLMNOPQRSTUVWXYZ
    //
    observers[siteId] = makeSiteA(siteId);
  }

  return observers;
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
    windCalcs: {
      cross: 1,
      headTail: 2,
      quadrant: Quadrant.Head,
      crossFactor: 2,
      crossType: CrossDoctrine.Quarter,

    },
    time: Date.now(),
    status: WeatherStatus.Receiving,
    windState: WindState.Critical
  };
}