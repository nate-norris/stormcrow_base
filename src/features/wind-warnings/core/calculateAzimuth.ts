import Utm from "geodesy/utm.js";

import { store } from "@/state";
import type { Hemisphere, Point } from "./models";
import { updateGunOrientAtom } from "../state/windWarnAtom";

export function updateGunOrientation(zone: number, hemisphere: Hemisphere, gun: Point, target: Point) {
    const gunLL = new Utm(zone, hemisphere, gun.easting, gun.northing).toLatLon();
    const targetLL = new Utm(zone, hemisphere, target.easting, target.northing).toLatLon();

    gunLL.lat
    gunLL.lon
    // gunLL.convergence

    targetLL.lat
    targetLL.lon
    // targetLL.convergence
    // const t = 10;
    // store.set(updateGunOrientAtom, t);
}