import { toast } from "sonner";

import { speakerNotify, SpeakerNotification, dbPersistQEEntry } from "@/tauri";
import { gatherQEStoreInputs } from "../actions/gatherStore";
import { canLogQE } from "../actions/validateQE";
import { default as buildQEEntry } from "../actions/buildQEEntry";
import { updateStateUponLog } from "../actions/updateQEState";

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
    console.log(entry);

     // pass QEEntry to tauri command
    const weatherRows = await dbPersistQEEntry(entry);

    updateStateUponLog(inputs.qeForm, weatherRows);

  } catch(err) {
    toast.error("QE Log Error: failed to log to database.")
    console.log(err);
    // TODO: log file
  }
}

