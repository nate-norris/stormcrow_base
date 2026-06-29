/**
 * Interface for declaring register method to begin awaiting and handling
 * Tauri events.
 */
export interface TauriEventHandler {
    register(): Promise<void>;
}