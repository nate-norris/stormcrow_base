import LatLonVincenty from 'geodesy/latlon-ellipsoidal-vincenty.js';

export type Hemisphere = "N" | "S";

type Coordinate = {
  easting: number;
  northing: number;
}

type TerrainPoint = Coordinate & {
  elevation: number;
}

// input for weapon/target after validation
export type AzimuthInput = {
  utm: number;
  hemisphere: Hemisphere;
  point: Coordinate;
}

// non corrected inputs
export type AzimuthRawInput = {
  utm: number;
  hemisphere: Hemisphere;
  easting: string;
  northing: string;
}

export type LocationConfig = {
  weapon: AzimuthRawInput;
  target: AzimuthRawInput;
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

export type AzimuthOutput = {
  weapon: LatLonVincenty;
  target: LatLonVincenty;
  weaponElevation: number;
  targetElevation: number;
  azimuth: number;
}