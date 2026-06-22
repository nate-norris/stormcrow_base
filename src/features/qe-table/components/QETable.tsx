import { useAtomValue } from "jotai";

import { qeTableRowsAtom } from "../state/tableRowsAtom";
import { DataTable } from "./DataTable";
import { columns } from "./columns";

export default function QETable() {
    const rows = useAtomValue(qeTableRowsAtom);
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={rows} />
        </div>

    );
}