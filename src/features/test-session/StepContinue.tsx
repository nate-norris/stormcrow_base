import { useState } from "react";
import { useAtom } from "jotai";

import { TestSessionSelector } from "./widgets";
import { Test, WindWarningConfig } from "@/models";
import { ModalBackButton } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { initiateTest } from "./sessionService";
import { activeTestAtom, activeConfigAtom } from "@/state";

// define the props
type ContinueProps = {
    onBack: () => void;
    onSubmit: () => void;
    tests: Test[];
    lastTest: Test | null;
};

export default function ContinueView({ onBack, onSubmit, tests, lastTest }: ContinueProps) {
    const [selectedId, setSelectedId] = useState<number | null>(lastTest?.id ?? null);
    const [isSelectionConflict, setIsSelectionConflict] = useState<boolean>(false);
    // global active test and wind warning configurations
    const [activeTest, setActiveTest] = useAtom(activeTestAtom);
    const [, setActiveConfig] = useAtom(activeConfigAtom);

     const handleSubmit = async () => {
        // confirm user is not attempting to continue a test already in session
        if (activeTest?.id === selectedId) {
            setIsSelectionConflict(true);
            return;
        }

        try {
            const continuingTest = tests.find(test => test.id === selectedId);
            if (continuingTest) {
                const [test, windConfig]: [Test, WindWarningConfig] =
                    await initiateTest(continuingTest.name);
                setActiveTest(test);
                setActiveConfig(windConfig);
                onSubmit(); // close the modal
            }
        } catch (error) {
            alert(error);
        }
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