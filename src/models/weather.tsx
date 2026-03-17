
// TODO transfer all types and interface to .d.ts?

export type WeatherObservation =
    WeatherPacket &
    WindCalcs & {
        time: Date
    }
export interface WeatherPacket {
    siteId: string,
    altitude: number,
    windFull: number,
    windDir: number,
    temp: number,
    humidity: number,
    baro: number
}

export interface WindCalcs {
    cross: number;
    headTail: number;
    quadrant: Quadrant,
    crossFactor: number,
    crossType: CrossDoctrine;
}

export enum Quadrant {
    Head,
    StarboardHead,
    Starboard,
    TailStarboard,
    Tail,
    TailPort,
    Port,
    PortHead,
}

export enum CrossDoctrine {
    None = 0,
    Quarter = 0.25,
    Half = 0.5,
    ThreeQuarter = 0.75,
    Full = 1.0,
}

