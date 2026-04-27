import { useState } from "react";

import { TestSessionSelector } from "./widgets";
import { Test } from "@/models";
import { ModalBackButton } from "@/components/ui/modal";

// define the props
type ContinueProps = {
    onBack: () => void;
    onSubmit: () => void;
    tests: Test[];
    last: Test | null;
};

export default function ContinueView({ onBack, onSubmit, tests, last }: ContinueProps) {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <div className="flex flex-col gap-4">
            <ModalBackButton action={onBack} />
            <div>Continue</div>
            <TestSessionSelector 
                tests={tests}
                selectedId={selectedId}
                onChange={setSelectedId}
            />
            <button className="btn" onClick={onSubmit}>Submit</button>
        </div>
    );
}