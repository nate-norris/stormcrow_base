import { WindCalcs, WindState } from "./models";

/**
 * Returns the wind warning state when compared to set maximum wind and
 * warning threshold.
 * 
 * @param c WindCalcs containing cross and headTail components of the passed
 * wind reading.
 * @param maxW The maximum wind allowed compared to total cross or head/tail 
 * wind components.
 * @param thresh The percentage threshold (ex .75) where the user wants to
 * be warned if approaching the max wind.
 * @returns WindState either Ok, Warn or Critical
 */
export function getWindState(c: WindCalcs, maxW: number, thresh: number) 
    : WindState {
    if (c.cross > maxW || c.headTail > maxW) {
        return WindState.Critical;
    } else if (c.cross > maxW * thresh || c.headTail > maxW * thresh) {
        return WindState.Warn;
    } else {
        return WindState.Ok;
    }
}