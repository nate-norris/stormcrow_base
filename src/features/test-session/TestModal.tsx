import { useState } from "react";

import { Modal } from "@/components/ui/modal";
import TestManagement from "./TestManageModal";

export default function TestModal() {
    const [open, setOpen] = useState(false);

    return(
        <Modal isOpen={open} setIsOpen={setOpen}>
            <TestManagement onComplete={() => setOpen(false)} />
        </Modal>
    );
}