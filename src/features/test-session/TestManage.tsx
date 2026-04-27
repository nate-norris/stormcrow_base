import { useState, useEffect } from "react";

import { Test } from "@/models"
import type { StepMode } from "./models";
import { Step } from "./models";
import MenuView from "./StepMenu";
import NewView from "./StepNew";
import ContinueView from "./StepContinue";
import DeleteView from "./StepDelete";
import { createNavigation } from "./navigation";
import * as service from "./sessionService";

/*
TODO:

- pull active test from jotai for confirmation in New/Continue/Delete 
- implement defaulting to continue for lastTest if within appropriate criteria
        allowDefaultContinue prop on TestManagement
- differentiate between first startup modal display and routing to test management
        should only compare to lastTest if on startup
- if no previous tests at all dont go to continue regardless of allowDefaultContinue
- build splash view for continue/delete showing details of selected test from dropdown
- add shadcn Sonner for confirmation?

*/
type Props = {
    onComplete: () => void;
    allowDefaultContinue: boolean;
}
export default function TestManagement({ onComplete, allowDefaultContinue }: Props) {

    // iterate through three primary selections for test management including:
    //      selection, new, continue, delete
    const [step, setStep] = useState<StepMode>(Step.Menu);
    // handle primary navigation between step modes
    const nav = createNavigation(step, setStep, onComplete);
    // all tests in database
    const [tests, setTests] = useState<Test[]>([]);
    // last known test
    const [lastTest, setLastTest] = useState<Test | null>(null);

    const loadModal = async () => {
        // all test sessions
        const t = await service.getTests();
        if (t) {
            setTests(t);
        }
        
        // last loaded test session for determining default step
        const lt = await service.getLastTest();
        if (lt) {
            setLastTest(lt);
        }
    };
    // load modal on first mount
    // TODO remove if step.Menu is always first load
    // if using continue makes this neccessary include it
    // useEffect(() => {
    //     loadModal(); 
    // }, []);
    // load modal on step change to menu
    useEffect(() => {
        if (step === Step.Menu) {
            loadModal(); // call the setup for the modal
        }
    }, [step]);

    const views = {
        menu: <MenuView onSelect={nav.go}/>,
        new: <NewView onBack={nav.back} onSubmit={nav.complete} tests={tests} />,
        continue: <ContinueView onBack={nav.back} onSubmit={nav.complete}  tests={tests} last={lastTest} />,
        delete: <DeleteView onBack={nav.back}  tests={tests} />,
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-panel">
                {views[step]}
            </div>
        </div>
    );

}