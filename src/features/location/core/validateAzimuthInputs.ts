import { AzimuthRawInput, Hemisphere } from "./models";
import { CONFIG_LIMITS } from "./constants";

export function validateAzimuthInputs(weapon: AzimuthRawInput, target: AzimuthRawInput): string {
    const checks = [
        () => checkUtmZone(weapon.utm),
        () => checkEasting(weapon.easting),
        () => checkNorthing(weapon.hemisphere, weapon.northing),
        () => checkUtmZone(target.utm),
        () => checkEasting(target.easting),
        () => checkNorthing(target.hemisphere, target.northing),
    ];

    for (const check of checks) {
        const error = check();

        if (error) {
            return error;
        }
    }
    return "";
}

function checkUtmZone(utm: number): string {
    if (utm < CONFIG_LIMITS.utmZones.min || utm > CONFIG_LIMITS.utmZones.max) {
        return "Error in UTM";
    }
    return "";
}

function checkEasting(easting: string): string {
    // verify empty string
    if (easting.trim() === "") {
        return "Easting is required";
    }

    // verify casts to number and is in range
    const eastingFloat = Number(easting);
    if (!Number.isFinite(eastingFloat) ||
        eastingFloat < CONFIG_LIMITS.easting.min || 
        eastingFloat > CONFIG_LIMITS.easting.max) {
        return "Error in Easting";
    }
    return ""
}

function checkNorthing(hemisphere: Hemisphere, northing: string): string {
    // verify empty string
    if (northing.trim() === "") {
        return "Northing is required";
    }
    // verify casts to number and is in range
    const northingFloat = Number(northing);

    if (!Number.isFinite(northingFloat)) return "Error in Northing";

    if ((hemisphere === "N") && !(
        CONFIG_LIMITS.northingNorth.min <= northingFloat &&
        northingFloat < CONFIG_LIMITS.northingNorth.max  
        )) {
        return "Error in Northing"
    }

    if ((hemisphere === "S") && !(
        CONFIG_LIMITS.northingSouth.min < northingFloat &&
        northingFloat <= CONFIG_LIMITS.northingSouth.max  
        )) {
        return "Error in Northing"
    }

    return ""
}