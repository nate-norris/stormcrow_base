import { toast } from "sonner";

import { processQECommand, QE_COMMANDS } from "@/features/qe";

import { gatherLoggingFormState } from "../actions/gatherLoggingFormState";
import { validateLoggingInputs } from "../actions/validateLoggingInputs";

export async function logQE() {
  const loggingForm = gatherLoggingFormState();

  if (!validateLoggingInputs(loggingForm)) {
      toast.error("QE log error: There are missing/invalid form inputs");
  }

  const isQEPersisted = await processQECommand({
      type: QE_COMMANDS.CREATE,
      loggingForm: loggingForm
  });

  if (!isQEPersisted) {
      toast.error("QE log error: confirm weather is receiving")
  } else {
      toast.error("QE log success")
  }
}