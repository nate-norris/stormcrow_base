import { store } from "@/state";

// atom inputs
import { activeTestAtom } from "@/features/test-session";
import { activeQEFormAtom } from "../state/loggingAtom";
import { activeWindConfigAtom } from "@/features/wind-warnings";
import { weatherObserversAtom } from "@/features/incoming-weather";
// return type including all atoms
import type { QEInputs } from "../core/qe_inputs";

export function gatherQEStoreInputs(): QEInputs {
    return {
        test: store.get(activeTestAtom),
        qeForm: store.get(activeQEFormAtom),
        warnConfig: store.get(activeWindConfigAtom),
        observers: store.get(weatherObserversAtom)
    }
}