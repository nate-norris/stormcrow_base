import { useState, useEffect } from "react";

import type { Test, StepMode } from "../core/models";
import { Step } from "../core/models";
import MenuView from "./StepMenu";
import NewView from "./StepNew";
import ContinueView from "./StepContinue";
import DeleteView from "./StepDelete";
import { createNavigation } from "../core/navigation";
import { testService } from "@/tauri";
import { CONTINUE_TIMEFRAME } from "../core/models";

/*
TODO:
- build splash view for continue/delete showing details of selected test from dropdown
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
    const [defaultLastTest, setDefaultLastTest] = useState<Test | null>(null);

    /** Load all tests. On boot attempt continue to last test.
     * 
     * If booting and the last loaded test is within the appropriate timeframe
     * the navigation will proceed to Step.Continue. Step.Menu will default
     * otherwise.
     */
    useEffect(() => {
        const initialize = async () => {
            const [t, lt] = await Promise.all([
                testService.getTests(),
                testService.getLastTest(),
            ]);

            if (t) setTests(t);

            if (allowDefaultContinue && lt) {
                const nowMs = Date.now()
                const lastInitiatedMs = lt.last_initiated * 1000;
                const elapsed = nowMs - lastInitiatedMs;

                if (elapsed < CONTINUE_TIMEFRAME) {
                    setDefaultLastTest(lt.test);
                    nav.go(Step.Continue);
                    return;
                }
            }
            // not continuing: go to menu
            nav.go(Step.Menu);
        }
        
        initialize(); // call async function
    }, [allowDefaultContinue]);

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