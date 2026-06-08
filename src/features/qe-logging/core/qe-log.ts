import { QEType } from "./qe-types";

export type QEBase = {
  count: number;
  qeType: QEType;
  testId: number;
};

export type QEConfiguration = {
  dodic: string;
  lot: string;
  gunOrient: number;
  time: number;
};

export type SiteWeatherInput = {
  siteId: string;
  altitude: number;
  windFull: number;
  windDirection: number;
  cross: number;
  tail: number;
  temp: number;
  humidity: number;
  baro: number;
}

export type QEEntry = {
  base: QEBase;
  config: QEConfiguration;
  sites: SiteWeatherInput[];
};