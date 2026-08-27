import { Quadrant, CrossDoctrine, WindCalcs } from "./models";

export function getWindCalculations(gunDegrees: number, windFull: number, windTo: number) : WindCalcs {
    // angle formatting
    const relativeWind = relativeAngle(gunDegrees, windTo);
    const rad = relativeWind * Math.PI / 180; // radians

    // cross specific calculations
    const sin = Math.sin(rad);
    const crossFactor: number = Math.abs(sin);

    const calcs: WindCalcs = {
        cross: Math.abs(windFull * sin), // port starboard
        headTail: Math.abs(windFull * Math.cos(rad)), // head tail
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