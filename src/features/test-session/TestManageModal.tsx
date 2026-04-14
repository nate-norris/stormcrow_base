import { useState } from "react";

import type { StepMode } from "./models";
import MenuView from "./StepMenu";
import NewView from "./StepNew";
import ContinueView from "./StepContinue";
import DeleteView from "./StepDelete";
import { createNavigation } from "./navigation";


export default function TestManagement() {
    // iterate through three primary selections for test management including:
    //      selection, new, continue, delete, confirmDelete
    const [step, setStep] = useState<StepMode>("menu");
    const nav = createNavigation(step, setStep);

    const views = {
        menu: <MenuView onSelect={setStep}/>,
        new: <NewView />,
        continue: <ContinueView />,
        delete: <DeleteView />,
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-panel">
                {views[step]}
            </div>
        </div>
    );

}