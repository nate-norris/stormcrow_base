import { atom } from "jotai";

import { weatherObserversAtom } from "./weatherObserversAtom";
import { type WeatherObservation, WindState, WeatherStatus } from "../core/models";

export const sortedSiteIdsAtom = atom((get) => {
//   const observers = get(weatherObserversAtom);
  const observers = Object.values(get(weatherObserversAtom));
  return observers
    .slice() // dont mutate source
    .sort((a, b) => {
        return evaluatePriority(a) - evaluatePriority(b);
    })
    .map(obs => obs.siteId); // return just siteId
});
 
function evaluatePriority(obs: WeatherObservation): number {
    if (obs.status === WeatherStatus.NotReceiving || obs.windState === WindState.Critical) {
        return 1;
    } 
    
    if (obs.status === WeatherStatus.Stale || obs.windState === WindState.Warn) {
        return 2;
    }
    
    if (obs.status === WeatherStatus.Receiving || obs.windState === WindState.Ok) {
        return 3;
    }
    
    return 3;
}