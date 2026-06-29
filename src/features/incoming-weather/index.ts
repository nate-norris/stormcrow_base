/**
 * Purpose
 * ------------
 * Acts as the event stream processor and state machine for weather events 
 * sent by the React consumer. The internal Jotai atom will be the State
 * Store / Sink to provide to UI components.
 */

export type { WeatherPacket, WeatherObservation } from "./core/models";
export { type WeatherObservers, weatherObserversAtom } from "./state/weatherObserversAtom";
export { default as WeatherStreamProcessor } from "./core/processor";
export { default as WeatherSites } from "./components/WeatherSites";