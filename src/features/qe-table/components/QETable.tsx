import { useAtomValue } from "jotai";
import { useState } from "react";

import { qeTableRowsAtom } from "../state/tableRowsAtom";
import { DataTable } from "./DataTable";
import { createColumns } from "./columns";
import type { QEKey } from "../core/qeKey";
import { AlertDeleteDialog } from "./AlertDelete";
import { removeQE } from "../services/removeQEEntry";

export default function QETable() {
    const rows = useAtomValue(qeTableRowsAtom);
    const [deleteQE, setDeleteKey] = useState<QEKey | null>(null);
    const [reassignQE, setReassignKey] = useState<QEKey | null>(null);

    function onDeleteRequest(key: QEKey) {
        setDeleteKey(key);
    }

    function cancelDeleteRequest() {
        setDeleteKey(null);
    }

    function onReassignRequest(key: QEKey) {
        setReassignKey(key);
    }

    return (
        <>
            <div className="container mx-auto py-10">
                <DataTable columns={createColumns(onDeleteRequest)} data={rows} />
            </div>

            <AlertDeleteDialog 
                qeKey={deleteQE}
                onCancel={cancelDeleteRequest}
                onConfirm={removeQE}
            
            />
        </>
        

    );
}