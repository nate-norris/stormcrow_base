import { useState } from "react";
import { ModalBackButton } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Test } from "@/models";
import { TestSessionSelector } from "./widgets";

// define the props
type DeleteProps = {
    onBack: () => void;
    tests: Test[];
};

export default function DeleteView({ onBack, tests }: DeleteProps) {

    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [isSelectionConflict, setIsSelectionConflict] = useState<boolean>(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);

    const handleSubmit = async () => {

        // confirm user is not attempting to delete an active test session
        const fakeId = 2; // TODO pull test selected id from jotai
        if (fakeId === selectedId) {
            setIsSelectionConflict(true);
            return;
        } else {
            setIsSelectionConflict(false);
        }

        setShowConfirmDialog(true);
    };

    return (

        <div className="flex flex-col items-center gap-3">
            <ModalBackButton action={onBack} />
            <h2 className="text-xl font-semibold mt-5">Delete a test</h2>

            {/* primary test selection */}
            {!showConfirmDialog && (
                <>
                    <div className="flex flex-col self-stretch">
                        <TestSessionSelector 
                            tests={tests}
                            selectedId={selectedId}
                            onChange={setSelectedId}
                        />
                        <p className={`text-sm mt-1 text-red-900 ${isSelectionConflict ? "visible" : "invisible"}`}>
                            Cannot delete a test currently in session.
                        </p>

                    </div>
                    <div className="w-full flex justify-end">
                        <Button className="w-1/3" onClick={handleSubmit}>
                            Go
                        </Button>
                    </div>
                </>
            )}

            {/* confirmation of test selection for deletion */}
            {showConfirmDialog && (
                <ConfirmDeleteView />
            )}
    </div>
    );
}

function ConfirmDeleteView() {
    return (
        // TODO use shadcn AlertDialog
        <></>
    );
}