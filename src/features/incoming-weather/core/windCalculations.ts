import { Quadrant, CrossDoctrine, WindCalcs } from "./models";

export function getWindCalculations(gunDegrees: number, windFull: number, windTo: number) : WindCalcs {
    // angle formatting
    const relativeWind = relativeAngle(gunDegrees, windTo);
    const rad = relativeWind * Math.PI / 180; // radians

    // cross specific calculations
    const sin = Math.sin(rad);
    const crossFactor: number = Math.abs(sin);

    const calcs: WindCalcs = {
        cross: windFull * sin, // port starboard
        headTail: windFull * Math.cos(rad), // head tail
        quadrant: getQuadrant(relativeWind),
        crossFactor: crossFactor,
        crossType: getCrossDoctrine(crossFactor),
    }
    return calcs
}

export function relativeAngle(reference: number, angle: number): number {
    const offset = angle - reference;
    return ((offset % 360) + 360) % 360;
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
    let _cross = wf * Math.sin(wtStandard-gdStandard);
    let _ht = wf * Math.cos(wtStandard-gdStandard);
    alert(_cross);
    alert(_ht);
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