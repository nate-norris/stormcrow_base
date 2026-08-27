import Utm from "geodesy/utm.js";
import LatLonVincenty from 'geodesy/latlon-ellipsoidal-vincenty.js';

import { AzimuthInput } from "../core/models";

/** Calculate azimuth using WGS 84 ellipsoidal Vincenty relative to true north
 * 
 * @param weapon 
 * 
 * @param target 
 * @returns Number
 */
export function calculateAzimuth(weapon: AzimuthInput, target: AzimuthInput): 
    number {
    // utm position
    const weaponUtm = new Utm(weapon.utm, weapon.hemisphere, weapon.point.easting, weapon.point.northing);
    const targetUtm = new Utm(target.utm, target.hemisphere, target.point.easting, target.point.northing);

    // latitude/longitude of each point
    const weaponLL = weaponUtm.toLatLon();
    const targetLL = targetUtm.toLatLon();

    // vincenty ellipsoidal positions
    const weaponVincenty = new LatLonVincenty(
        weaponLL.lat,
        weaponLL.lon,
    );
    const targetVincenty = new LatLonVincenty(
        targetLL.lat,
        targetLL.lon,
    );

    // azimuth bearing
    return Number(weaponVincenty.initialBearingTo(targetVincenty).toFixed(3));
}