import { toast } from "sonner";

import { speakerNotify, SpeakerNotification } from "@/lib/sound-notifications";
import { gatherQEStoreInputs } from "./gatherStore";
import { canLogQE } from "./validateQE";
import { default as buildQEEntry } from "./buildQEEntry";
import { dbPersistQEEntry } from "@/tauri";
import { updateStateUponLog } from "./updateQEState";

export default async function logQE() {
  try {
    // gather atoms in store
    const inputs = gatherQEStoreInputs();

    // verify if clear to log
    if (!canLogQE(inputs)) {
      toast.error("QE Log Error: There are missing inputs or no weather available");
      await speakerNotify(SpeakerNotification.GeneralError);
      return;
    }
    // build QEEntry
    const entry = buildQEEntry(inputs);

     // pass QEEntry to tauri command
    const weatherRows = await dbPersistQEEntry(entry);

    updateStateUponLog(inputs.qeForm, weatherRows);

  } catch(err) {
    toast.error("QE Log Error: failed to log to database.")
    // TODO: log file
  }
}

