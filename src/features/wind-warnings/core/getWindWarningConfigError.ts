import type { WindWarningConfig } from "../core/models";
import { CONFIG_LIMITS } from "./constants";  
  
export function getWindWarningConfigError(config: WindWarningConfig): string {
    // confirm max wind
    if (config.maxWind < CONFIG_LIMITS.maxWind.min || 
        config.maxWind > CONFIG_LIMITS.maxWind.max) {
        return `Max wind must be between ${CONFIG_LIMITS.maxWind.min} and 
        ${CONFIG_LIMITS.maxWind.max} m/s.`;
    }

    // confirm threshold percent
    if (config.thresholdPercent < CONFIG_LIMITS.percentage.min || 
        config.thresholdPercent > CONFIG_LIMITS.percentage.max) {
        return `Threshold must be between ${CONFIG_LIMITS.percentage.min} and 
        ${CONFIG_LIMITS.percentage.max} %.`;
    }

    // confirm weapon orientation
    if (config.gunOrient < CONFIG_LIMITS.direction.min || 
        config.gunOrient > CONFIG_LIMITS.direction.max) {
        return `Weapon direction must be between ${CONFIG_LIMITS.direction.min}° and 
        ${CONFIG_LIMITS.direction.max}°.`;
    }

    // confirm site count
    if (config.expectedSites < CONFIG_LIMITS.siteCount.min || 
        config.expectedSites > CONFIG_LIMITS.siteCount.max) {
        return `Site count must be between ${CONFIG_LIMITS.siteCount.min} and 
        ${CONFIG_LIMITS.siteCount.max}.`;
    }

    return "";
}