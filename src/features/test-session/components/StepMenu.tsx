import { ClipboardListIcon } from "lucide-react";

import { Step } from "../core/models";

// limited sub selection of StepMode
type MenuSteps =
  | typeof Step.New
  | typeof Step.Continue
  | typeof Step.Delete;
// define the props
type MenuProps = {
    onSelect: (step: MenuSteps) => void;
};

export default function MenuView({ onSelect}: MenuProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 h-full">
            <div className="relative w-full">
                <ClipboardListIcon className="absolute left-0 top-1/2 size-8 -translate-y-1/2" />

                <h2 className="text-center text-xl font-semibold">
                    What’s the plan for today?
                </h2>
            </div>

            <div className="flex flex-col gap-3 w-64">
                <button className="btn hover:scale-110 hover:font-semibold" onClick={() => onSelect("new")}>
                    New test
                </button>
                <button className="btn hover:scale-110 hover:font-semibold" onClick={() => onSelect("continue")}>
                    Continue previous test
                </button>
                <button className="btn hover:scale-110 hover:font-semibold" onClick={() => onSelect("delete")}>
                    Delete a test
                </button>
            </div>
        </div>
    );
}