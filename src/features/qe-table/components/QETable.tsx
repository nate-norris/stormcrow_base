import { useAtomValue } from "jotai";
import { useState } from "react";

import { qeTableRowsAtom } from "../state/tableRowsAtom";
import { DataTable } from "./DataTable";
import { createColumns } from "./columns";
import type { QEKey } from "../core/qeKey";
import { AlertDeleteDialog } from "./AlertDelete";
import { AlertReassignDialog } from "./AlertReassign"
import { removeQE } from "../services/removeQEEntry";
import { reassignQE } from "../services/reassignQE";

export default function QETable() {
    const rows = useAtomValue(qeTableRowsAtom);
    const [deleteQE, setDeleteKey] = useState<QEKey | null>(null);
    const [reassign, setReassignKey] = useState<QEKey | null>(null);

    function onDeleteRequest(key: QEKey) {
        setDeleteKey(key);
    }

    function cancelDeleteRequest() {
        setDeleteKey(null);
    }

    function onReassignRequest(key: QEKey) {
        setReassignKey(key);
    }

    function cancelReassignRequest() {
        setReassignKey(null);
    }

    return (
        <>
            <div className="container mx-auto py-10">
                <DataTable columns={createColumns(onDeleteRequest, onReassignRequest)} data={rows} />
            </div>

            {deleteQE && (
                <AlertDeleteDialog 
                    qeKey={deleteQE}
                    onCancel={cancelDeleteRequest}
                    onConfirm={removeQE}
                />
            )}
            {reassign && (
                <AlertReassignDialog
                    qeKey={reassign}
                    onCancel={cancelReassignRequest}
                    onConfirm={reassignQE}
                />
            )}
        </>
    );
}