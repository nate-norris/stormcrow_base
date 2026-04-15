import { Step } from "./models";

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
            <h2 className="text-xl font-semibold">
                What’s the plan for today?
            </h2>

            <div className="flex flex-col gap-3 w-64">
                <button className="btn" onClick={() => onSelect("new")}>
                    New test
                </button>
                <button className="btn" onClick={() => onSelect("continue")}>
                    Continue previous test
                </button>
                <button className="btn" onClick={() => onSelect("delete")}>
                    Delete a test
                </button>
            </div>
        </div>
    );
}