/**
 * Purpose
 * ------------
 * Acts as the event stream processor and state machine for weather events 
 * sent by the React consumer. The internal Jotai atom will be the State
 * Store / Sink to provide to UI components.
 */

// common types
export type { WeatherPacket, WeatherObservation } from "./core/models";

// state
export { type WeatherObservers, weatherObserversAtom } from "./state/weatherObserversAtom";
export { siteIdsAtom } from "./state/siteIdsAtom";
export { receivingSitesAtom } from "./state/receivingSitesAtom";
export { overThresholdWindAtom } from "./state/overThresholdWindAtom";
export { overMaxWindAtom } from "./state/overMaxWindAtom";

// service
export { weatherProcessor } from "./core/weatherProcessor";

// component
export { default as WeatherSites } from "./components/WeatherSites";