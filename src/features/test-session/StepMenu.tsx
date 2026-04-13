import { StepMode } from "./models";

// limited sub selection of StepMode
type MenuAction = Extract<StepMode, "new" | "continue" | "delete">;
type MenuProps = {
    onSelect: (action: MenuAction) => void;
};


function MenuView({ onSelect}: MenuProps) {
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