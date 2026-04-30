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
- document
- error handling
- build splash view for continue/delete showing details of selected test from dropdown
- sorted test by recent
*/
type Props = {
    onComplete: () => void;
    allowDefaultContinue: boolean;
}
export default function TestManagement({ onComplete, allowDefaultContinue }: Props) {

    // component has initialized. stored for default to continue step
    const [initialized, setInitialized] = useState<boolean>(false);
    // iterate through three primary selections for test management including:
    //      selection, new, continue, delete
    const [step, setStep] = useState<StepMode>(Step.Menu);
    // handle primary navigation between step modes
    const nav = createNavigation(step, setStep, onComplete);
    // all tests in database
    const [tests, setTests] = useState<Test[]>([]);
    // last known test
    const [lastTest, setLastTest] = useState<Test | null>(null);
    const [defaultLastTest, setDefaultLastTest] = useState<Test | null>(null);

    // load modal on step change to menu
    useEffect(() => {
        if (step === Step.Menu) {
            loadModal(); // call the setup for the modal
        }
    }, [step]);

    // Jump step to continue with default selection upon start up and
    // if there previous last test was within the allowed time frame.
    useEffect(() => {
        // return if not on boot, no provided lastTest, or ran previously
        if (!allowDefaultContinue || !lastTest || initialized) return;

        const now = Date.now();
        const last = new Date(lastTest.time).getTime();

        if (now - (last*1000) < 1000*60*60*24) {
            setDefaultLastTest(lastTest);
        }

        setInitialized(true); // do not allow continue jump again
        nav.go(Step.Continue);
    }, [lastTest, allowDefaultContinue]);

    // populate tests and last test
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

    const views = {
        menu: <MenuView onSelect={nav.go}/>,
        new: <NewView onBack={nav.back} onSubmit={nav.complete} tests={tests} />,
        continue: <ContinueView onBack={nav.back} onSubmit={nav.complete}  
            tests={tests} lastTest={defaultLastTest} />,
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