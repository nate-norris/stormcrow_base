import { toast } from "sonner";

import { speakerNotify, SpeakerNotification } from "@/lib/sound-notifications";
import { gatherQEStoreInputs } from "./gatherStore";
import { canLogQE } from "./validateQE";
// import { default as buildQEEntry } from "./buildQEEntry";
// import { validateQEEntry } from "./validateQE";

export default async function logQE() {
  
  const inputs = gatherQEStoreInputs();

  if (!canLogQE(inputs)) {
    toast.error("QE Log Error: There are missing inputs or no weather available");
    await speakerNotify(SpeakerNotification.GeneralError);
    return;
  }
  // const entry = buildQEEntry(gatherQEStoreInputs());
  console.log(JSON.stringify(inputs, null, 2));

  // const isValid: boolean = validateQEEntry(entry);
  // await submitQEEntry(entry);
  // updateQEState();
}