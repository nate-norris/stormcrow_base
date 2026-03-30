/**
 * Represents the settings the user will provide for real-time wind comparison.
 * @interface WindWarningSettings
 */
export interface WindWarningConfig {
  id: number,
  max_wind: number;
  threshold_percent: number; // 0 -100
  gun_orient: number;
  expected_sites: number;
}