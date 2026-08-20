export const CONFIG_LIMITS = {
  maxWind: { min: 0, max: 20 },
  percentage: { min: 0, max: 100 },
  direction: { min: 0, max: 359 },
  siteCount: { min: 1, max: 26 }, // A-Z
  utmZones: { min: 1, max: 60 }, 
  easting: { min: 0, max: 1_000_000 },
  northingNorth: { min: 0, max: 9_328_094 },
  northingSouth: { min: 1_118_414, max: 10_000_000 },
};