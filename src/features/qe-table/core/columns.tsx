import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { QETableRow } from "../core/tableRow";

export const columns: ColumnDef<QETableRow>[] = [
    {
        accessorKey: "qeKey",
        header: ({ column }) => {
            return (
                <Button 
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                    QE
                </Button>
            )
        },
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
        header: ({ column }) => {
            return (
                <Button 
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                    Time
                </Button>
            )
        },
        cell: ({ getValue }) => {
            // return new Date(getValue<number>()).toLocaleTimeString();
            return new Intl.DateTimeFormat("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            }).format(new Date(getValue<number>()));
        },
    },
    {
        id: "actions",
        cell: ({row}) => {
            const rowId = row.original.id

        },
    },
];