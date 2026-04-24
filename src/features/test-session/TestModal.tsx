import { useState } from "react";

import { Modal } from "@/components/ui/modal";
import TestManagement from "./TestModal";

type Props = {
    isOnStartup: boolean; // application is booting
}
export default function TestModal({ isOnStartup }: Props) {
    const [open, setOpen] = useState(true);

    return(
        <Modal isOpen={open} setIsOpen={setOpen}>
            <TestManagement 
                onComplete={() => setOpen(false)} // close modal
                // skip to continue step on startup if available
                allowDefaultContinue={isOnStartup}
            />
        </Modal>
    );
}