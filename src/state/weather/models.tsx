
export const WeatherStatus = {
  Receiving: "RECEIVING",
  Stale: "STALE",
  NotReceiving: "NOT_RECEIVING",
} as const;
type WeatherS =
  typeof WeatherStatus[keyof typeof WeatherStatus];

export type WeatherObservation =
    WeatherPacket &
    WindCalcs & {
        time: number,
        status: WeatherS
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

// structure for past log of wind values
export type WindFullEvent = {
    time: number,
    windFull: number
}

// Defines what types atom will receive updates on:
// "observation" -> full WeatherObservation for new weather incoming
// "status" -> timer update for stale or not receiving data
export type WeatherUpdate =
  | { type: "observation"; data: WeatherObservation }
  | { type: "status"; siteId: string; status: WeatherS };

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

export interface WindCalcs {
    cross: number;
    headTail: number;
    quadrant: Quadrant,
    crossFactor: number,
    crossType: CrossDoctrine;
}