import { invoke } from "@tauri-apps/api/core";
import type { SpeakerNotification } from "./models";

export async function speakerNotify(sType: SpeakerNotification): Promise<void> {
    await invoke("speaker_command", {
        notification: sType,
    });
}