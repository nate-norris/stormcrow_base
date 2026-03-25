
// export type WeatherPacketEvent = 
//     | { type: WeatherPacketEventType.Received; observation: WeatherObservation }
//     | { type: WeatherPacketEventType.Timeout; siteId: string };

// export enum WeatherPacketEventType {
//     Received = "RECEIVED",
//     Timeout = "TIMEOUT",
// }
// export enum WeatherEventEnum {
//     NewPacket = "NEW_PACKET",
//     Error = "ERROR",
// }

// export interface WeatherState {
//     observation?: WeatherObservation;
//     status: WeatherStatus;
//     lastUpdate?: number; // date TODO should remove since WeatherObservation contains time?
// }
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