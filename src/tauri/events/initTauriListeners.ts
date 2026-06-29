import { TauriEventHandler } from "./models";
import { weatherHandler } from "./weather";
import { boomHandler } from "./boom";

/**
 * Initialize waiting for Tauri events.
 * 
 * Events will be processed in the respective register function for the handler.
 * 
 * Will translate event from list<T>() to proper domain type and pass to the
 * correct processor.
 * 
 * Events take the form:
 * type Event<T> = {
 *      event: string;
 *      payload: T;
 *      id: number;
 * }
 */
export async function initTauriListeners() {
    const handlers: TauriEventHandler[] = [
        weatherHandler,
        boomHandler,
    ];
    await Promise.all(
        handlers.map(handler => handler.register())
    );
}