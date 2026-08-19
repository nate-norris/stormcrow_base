/**
 * Represents the settings the user will provide for real-time wind comparison.
 * @interface WindWarningSettings
 */
export interface WindWarningConfig {
  id: number,
  maxWind: number;
  thresholdPercent: number; // 0 -100
  gunOrient: number;
  expectedSites: number;
}

export type Hemisphere = "N" | "S";

type Point = {
  easting: number;
  northing: number;
}

// input for weapon/target after validation
export type AzimuthInput = {
  utm: number;
  hemisphere: Hemisphere;
  point: Point;
}

// non corrected inputs
export type AzimuthRawInput = {
  utm: number;
  hemisphere: Hemisphere;
  easting: string;
  northing: string;
}

export function toInput(raw: AzimuthRawInput): AzimuthInput {
  return {
    utm: raw.utm,
    hemisphere: raw.hemisphere,
    point: {
      easting: Number(raw.easting),
      northing: Number(raw.northing)
    }
  }
}