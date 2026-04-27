import { useState } from "react";

import { TestSessionSelector } from "./widgets";
import { Test } from "@/models";
import { ModalBackButton } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

// define the props
type ContinueProps = {
    onBack: () => void;
    onSubmit: () => void;
    tests: Test[];
    currentTest: Test | null;
};

export default function ContinueView({ onBack, onSubmit, tests, currentTest }: ContinueProps) {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [isSelectionConflict, setIsSelectionConflict] = useState<boolean>(false);

     const handleSubmit = async () => {
        // confirm user is not attempting to delete an active test session
        const fakeId = 2; // TODO pull test selected id from jotai
        if (fakeId === selectedId) {
            setIsSelectionConflict(true);
            return;
        }

        //onSubmit();
    };

    return (
        <div className="flex flex-col items-center gap-3">
            <ModalBackButton action={onBack} />
            <h2 className="text-xl font-semibold mt-5">Continue a test</h2>
            <div className="flex flex-col self-stretch">
                <TestSessionSelector
                    tests={tests}
                    selectedId={selectedId}
                    onChange={setSelectedId}
                />
                <p className={`text-sm mt-1 text-red-900 ${isSelectionConflict ? "visible" : "invisible"}`}>
                    Please select a test not already in session.
                </p>
            </div>
            <div className="w-full flex justify-end">
                <Button className="w-1/3" onClick={handleSubmit}>
                    Go
                </Button>
            </div>
        </div>
    );
}