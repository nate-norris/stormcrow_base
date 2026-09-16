import { isCompleteDODICInput } from "../components/DodicInput";
import { isCompleteLotInput } from "../components/Lot/lotParser";
import { LoggingFormState } from "@/features/qe"

/**
 * Confirm all inputs are available/valid for submission
 * 
 * - DODIC
 * - Lot
 * - QE Count
 * - QE Type
 * @returns boolean true if form is valid; false otherwise
 */
export function validateLoggingInputs(loggingForm: LoggingFormState): boolean {
  return isCompleteDODICInput(loggingForm.dodic) &&
    isCompleteLotInput(loggingForm.lot) &&
    loggingForm.qe.count >= 1
}
