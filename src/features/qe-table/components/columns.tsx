import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import type { QEKey } from "../core/qeKey";
import { QETableRow } from "../core/tableRow";
import { removeQE } from "../services/removeQEEntry";
import { QEType } from "@/features/qe-logging";

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
        cell: ({ row }) => {
            // create QEKey from string qeKey
            const idx = row.original.qeKey.search(/\D/);
            const count = Number(row.original.qeKey.slice(0, idx));
            const qeType = row.original.qeKey.slice(idx);
            const key: QEKey =  {
                count: count,
                qeType: qeType as QEType,
            }
        
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                        <DropdownMenuItem
                            onClick={() => removeQE(key)}
                        >
                            Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem>Reassign</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];