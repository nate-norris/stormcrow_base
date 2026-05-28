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