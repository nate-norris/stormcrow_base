import { Quadrant, CrossDoctrine, WindCalcs, WindState } from "./models";

export function getWindCalculations(gunDegrees: number, windFull: number, windTo: number) : WindCalcs {
    const relativeOffset = windTo - gunDegrees
    const rad = relativeOffset * Math.PI / 180; // radians
    const sin = Math.sin(rad);

    const crossFactor: number = Math.abs(sin);
    const quadrant: Quadrant = getQuadrant(relativeOffset);

    const calcs: WindCalcs = {
        cross: windFull * sin, // port starboard
        headTail: windFull * Math.cos(rad), // head tail
        quadrant: quadrant,
        crossFactor: crossFactor,
        crossType: getCrossDoctrine(crossFactor),
    }
    return calcs
}

/*
DEGREE / QUADRANT NORMALIZATION NOTE
------------------------------------

Current System (Navigation / Wind Bearing)
------------------------------------------
- 0°   = North (+Y)
- Degrees increase CLOCKWISE
- Quadrants labeled clockwise: I → II → III → IV

              0° (N)
                |
        IV      |      I
                |
270° (W) -------+------- 90° (E)
                |
        III     |      II
                |
             180° (S)


Normalized System (Math / Unit Circle)
--------------------------------------
- 0°   = +X axis (Right / East)
- Degrees increase COUNTER-CLOCKWISE
- Standard Cartesian quadrants

                90°
                 |
         II      |      I
                 |
180° ------------+------------ 0°
                 |
         III     |      IV
                 |
                270°


Degree Mapping
--------------
currentDeg → normalizedDeg

normalizedDeg = (450 - currentDeg) % 360
               = (360 - currentDeg + 90) % 360


Cardinal Direction Mapping
---------------------------
Current   →   Normalized
--------------------------------
0°   (N)  →   90°
90°  (E)  →   0°
180° (S)  →   270°
270° (W)  →   180°


Quadrant Mapping
----------------
Current (CW)     Normalized (CCW)
----------------------------------
I   (NE)   →     I
II  (SE)   →     IV
III (SW)   →     III
IV  (NW)   →     II

TODO:
Confirm whether trig inputs must be normalized prior to sin/cos usage.
*/
export function calc(gD: number, wf: number, wT: number) {
    //TODO get true north not magnetic
    let gdStandard = 450 - gD; // (450-gD)%360
    let wtStandard = 450 - wT;
    let cross = wf * Math.sin(wtStandard-gdStandard);
    let ht = wf * Math.cos(wtStandard-gdStandard);
}

/**
 * Returns the wind warning state when compared to set maximum wind and
 * warning threshold.
 * 
 * @param c WindCalcs containing cross and headTail components of the passed
 * wind reading.
 * @param maxW The maximum wind allowed compared to total cross or head/tail 
 * wind components.
 * @param thresh The percentage threshold (ex .75) where the user wants to
 * be warned if approaching the max wind.
 * @returns WindState either Ok, Warn or Critical
 */
export function getWindState(c: WindCalcs, maxW: number, thresh: number) : WindState {
    if (c.cross > maxW || c.headTail > maxW) {
        return WindState.Critical;
    } else if (c.cross > maxW * thresh || c.headTail > maxW * thresh) {
        return WindState.Warn;
    } else {
        return WindState.Ok;
    }
}


function getQuadrant(relativeOffset: number): Quadrant {
    const a = (relativeOffset % 360 + 360) % 360;
    if (a < 22.5 || a >= 337.5) return Quadrant.Head;
    if (a < 67.5)  return Quadrant.StarboardHead;
    if (a < 112.5) return Quadrant.Starboard;
    if (a < 157.5) return Quadrant.TailStarboard;
    if (a < 202.5) return Quadrant.Tail;
    if (a < 247.5) return Quadrant.TailPort;
    if (a < 292.5) return Quadrant.Port;
    return Quadrant.PortHead;
}

function getCrossDoctrine(f: number): CrossDoctrine {
    const clamped = Math.min(1, Math.max(0, f));
    const step = 0.25
    const quantized = Math.round(clamped / step) * step;

    return quantized as CrossDoctrine
}