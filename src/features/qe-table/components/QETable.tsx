import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";

import { QE } from "@/features/qe";

import { qeTableRowsAtom } from "../state/tableRowsAtom";
import { DataTable } from "./DataTable";
import { AlertDeleteDialog } from "./AlertDelete";
import { AlertReassignDialog } from "./AlertReassign"
import { getColumns } from "./columns";
import { tableSortingAtom } from "../state/tableSortingAtom";
import { tableFiltersAtom } from "../state/tableFiltersAtom";

export default function QETable() {
  const rows = useAtomValue(qeTableRowsAtom);
  const [sorting, setSorting] = useAtom(tableSortingAtom);
  const [filters, setFilters] = useAtom(tableFiltersAtom);
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
          sorting={sorting}
          onSortingChange={setSorting}
          columnFilters={filters}
          onFiltersChange={setFilters}
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