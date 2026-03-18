import { Quadrant, CrossDoctrine, WindCalcs } from "./models";

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