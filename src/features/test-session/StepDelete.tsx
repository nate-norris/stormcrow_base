import { useState } from "react";
import { ModalBackButton } from "@/components/ui/modal";
import { Test } from "@/models";
import { TestSessionSelector } from "./widgets";

// define the props
type DeleteProps = {
    onBack: () => void;
    tests: Test[];
};

export default function DeleteView({ onBack, tests }: DeleteProps) {
    // TODO show warning if trying to delete current active test session
    //      do not allow delete to finalize
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [isSelectionConflict, setIsSelectionConflict] = useState(false);

    const handleSubmit = async () => {
        // confirm user is not attempting to delete an active test session
        const fakeId = 2; // TODO pull test selected id from jotai
        if (fakeId === selectedId) {
            setIsSelectionConflict(true);
            return;
        }
    };

    const handleCancel = async () => {
        setSelectedId(null);
    }

    return (

        <div className="flex flex-col gap-4">
            <ModalBackButton action={onBack} />
            {!selectedId && (
                <>
                    <div>Delete</div>
                        <TestSessionSelector 
                            tests={tests}
                            selectedId={selectedId}
                            onChange={setSelectedId}
                        />
                    {isSelectionConflict ? (
                            <p className="text-red-900">Cannot delete an active test.</p>
                    ): (<></>)}
                    <button className="btn" onClick={handleSubmit}>Submit</button>
                </>
            )}

            {!selectedId && (
                <></>
            )}
    </div>
    );
}


function ConfirmDeleteView() {
    return (
        <></>
    );
}