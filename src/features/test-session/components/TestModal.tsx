import { Modal } from "@/components/ui/modal";
import TestManagement from "./TestManage";

type Props = {
    isOpen: boolean;
    entryMode: "menu" | "continue-if-possible";
    onClose: () => void;
}
export default function TestModal({ isOpen, entryMode, onClose }: Props) {
    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <TestManagement 
                onComplete={onClose} // close modal
                // skip to continue step on startup if available
                allowDefaultContinue={entryMode === "continue-if-possible" ? true : false}
            />
        </Modal>
    );
}