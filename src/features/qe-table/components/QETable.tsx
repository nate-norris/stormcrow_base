import { useAtomValue } from "jotai";
import { useState } from "react";

import { QE } from "@/features/qe";

import { qeTableRowsAtom } from "../state/tableRowsAtom";
import { DataTable } from "./DataTable";
import { AlertDeleteDialog } from "./AlertDelete";
import { AlertReassignDialog } from "./AlertReassign"
import { getColumns } from "./columns";

export default function QETable() {
  const rows = useAtomValue(qeTableRowsAtom);
  const [deleteQE, setDeleteQE] = useState<QE | null>(null);
  const [reassign, setReassignQE] = useState<QE | null>(null);

  function onDeleteRequest(qe: QE) {
    setDeleteQE(qe);
  }

  function cancelDeleteRequest() {
    setDeleteQE(null);
  }

  function onReassignRequest(qe: QE) {
    setReassignQE(qe);
  }

  function cancelReassignRequest() {
    setReassignQE(null);
  }

  return (
    <>
      <div className="container mx-auto py-5">
        <DataTable 
          columns={getColumns({onDeleteRequest, onReassignRequest})} 
          data={rows} 
        />
      </div>

      {deleteQE && (
        <AlertDeleteDialog 
          qe={deleteQE}
          onCancel={cancelDeleteRequest}
        />
      )}
      {reassign && (
        <AlertReassignDialog
          qe={reassign}
          onCancel={cancelReassignRequest}
        />
      )}
    </>
  );
}