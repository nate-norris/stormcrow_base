export function buildPayload(): QEPayload {
  return null;
}

type QEPayLoad {
  count: number;
  qeType: string;
  testId: number
  dodic: string;
  lot: string;
  gunOrient: number;
  time: number;
}

type SiteWeather {
  siteId: number;
  range: number;
  altitude: number;
  windFull: number;
  windDirection: number;
  cross: number;
  tail: number;
  temp: number;
  humidity: number;
  baro: number;
}