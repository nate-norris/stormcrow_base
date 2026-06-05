// TODO: validate test, dodic, lot, qe, qe type selection
import { QEInputs } from "../core/qe_inputs";
import { isCompleteDODICInput } from "../components/DodicInput";
import { isCompleteLotInput } from "../components/Lot/lotParser";

export function canLogQE(inputs: QEInputs): boolean {
  return !!inputs.test && // valid test 
    isCompleteDODICInput(inputs.qeForm.dodic) && // verified dodic
    isCompleteLotInput(inputs.qeForm.lot) && // verified lot
    inputs.qeForm.qeCount >= 1 && // valid QE
    Object.keys(inputs.observers).length > 0 // at least one site received weather
}