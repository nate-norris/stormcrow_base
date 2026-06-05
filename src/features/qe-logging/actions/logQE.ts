import { gatherQEStoreInputs } from "./gatherStore";
import { canLogQE } from "./validateQE";
// import { default as buildQEEntry } from "./buildQEEntry";
// import { validateQEEntry } from "./validateQE";

export default async function logQE() {
  
  const inputs = gatherQEStoreInputs();

  if (!canLogQE(inputs)) {
    //notifyErrorUI
    //playErrorSounds
    console.log("cant log");
    return;
  }
  // const entry = buildQEEntry(gatherQEStoreInputs());
  console.log(JSON.stringify(inputs, null, 2));

  // const isValid: boolean = validateQEEntry(entry);
  // await submitQEEntry(entry);
  // updateQEState();
}