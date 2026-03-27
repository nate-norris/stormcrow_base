
// TODO go through client/server side and change TestConfiguration to new
// WarningSettings
//
/**
 * TODO go through client/server side and change TestConfiguration to 
 * new WindWarningSettings.
 * 
 * The new settings no longer need to separate cross from head/tail and will
 * not be allowing anything other than default wind reading type (no Knots).
 * Expected sites will be added for simple test session expectations to match
 * what is receiving for weather sites.
 */
export interface TestConfiguration {
  id: number;
  cross: number;
  cross_type: string;
  tail: number;
  tail_type: string;
  gun_orient: number;
  tolerance: number;
}

/**
 * Represents the settings the user will provide for real-time wind comparison.
 * @interface WindWarningSettings
 */
export interface WindWarningSettings {
  id: number,
  max_wind: number;
  threshold_percent: number; // 0 -100
  gun_orient: number;
  expected_sites: number;
}