import { QEType } from "./qe-types";

export type QEEntry = {
  base: {
    count: number;
    qeType: QEType;
    testId: number;
  };

  config: {
    dodic: string;
    lot: string;
    gunOrient: number;
    time: number;
  };

  sites: SiteWeatherInput[];
};

type SiteWeatherInput = {
  siteId: number;
  altitude: number;
  windFull: number;
  windDirection: number;
  cross: number;
  tail: number;
  temp: number;
  humidity: number;
  baro: number;
}