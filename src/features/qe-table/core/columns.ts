import { ColumnDef } from "@tanstack/react-table";

import { QETableRow } from "../core/tableRow";

export const columns: ColumnDef<QETableRow>[] = [
    {
        accessorKey: "qeKey",
        header: "QE",
    },
    {
        accessorKey: "dodic",
        header: "DODIC",
    },
    {
        accessorKey: "lot",
        header: "LOT",
    },
    {
        accessorKey: "siteId",
        header: "Site",
    },
    {
        accessorKey: "windFull",
        header: "Wind",
    },
    {
        accessorKey: "windDirection",
        header: "Wind \u00b0",
    },
    {
        accessorKey: "temp",
        header: "\u00b0 F",
    },
    {
        accessorKey: "humidity",
        header: "Hum",
    },
    {
        accessorKey: "baro",
        header: "inHg",
    },
    {
        accessorKey: "time",
        header: "Time",
    },
];