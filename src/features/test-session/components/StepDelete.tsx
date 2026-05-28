import { useState } from "react";
import { useAtom } from "jotai";

import { ModalBackButton } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Test } from "@/models";
import { TestSessionSelector } from "./widgets";
import { deleteTest } from "./sessionService";
import { activeTestAtom } from "@/state";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

// define the props
type DeleteProps = {
    onBack: () => void;
    tests: Test[];
};

export default function DeleteView({ onBack, tests }: DeleteProps) {

    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [isSelectionConflict, setIsSelectionConflict] = useState<boolean>(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
    // global active test and wind warning configurations
    const [activeTest, ] = useAtom(activeTestAtom);

    const handleSubmit = async () => {
        // confirm user is not attempting to delete an active test session
        if (activeTest?.id === selectedId) {
            setIsSelectionConflict(true);
            return;
        }

        setIsSelectionConflict(false);
        setShowConfirmDialog(true);
    };

    const handleDelete = async () => {
        // const exists = tests.some(test => test.name === n);
        const deletingTest = tests.find(test => test.id === selectedId);
        if (deletingTest) {
            await deleteTest(deletingTest.name);
            onBack(); // go back to menu upon delete
        }
    }

    return (
        <div className="flex flex-col items-center gap-3">
            <ModalBackButton action={onBack} />
            <h2 className="text-xl font-semibold mt-5">Delete a test</h2>

            {/* primary test selection */}
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

            {/* confirmation of test selection for deletion */}
            <AlertDialog
                open={showConfirmDialog} 
                onOpenChange={setShowConfirmDialog}
            >
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. The test and all associated data will be permanently removed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}