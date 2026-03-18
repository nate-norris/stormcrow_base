/**
 * Purpose
 * ------------
 * Acts as the event stream processor and state machine for weather events 
 * sent by the React consumer. The internal Jotai atom will be the State
 * Store / Sink to provide to UI components.
 */

export type { WeatherPacket } from "./models";
export { WeatherProcessor } from "./processor";
export { sortedWeatherObserversAtom } from "./derived";