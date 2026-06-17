// returned type from db entry
export type WeatherRow = {
  id: number;
  siteId: string;
  altitude: number;
  gunOrient: number;
  count: number;
  qeType: string;
  dodic: string;
  lot: string;
  windFull: number;
  windDirection: number;
  cross: number;
  tail: number;
  temp: number;
  humidity: number;
  baro: number;
  time: number;
  testId: number;
}