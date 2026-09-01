import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { QETableRow } from "../core/tableRow";
import { type QE, qeFromString } from "@/features/qe";

export function createColumns(
    onDeleteRequest: (qe: QE) => void, 
    onReassignRequest: (qe: QE) => void):
    ColumnDef<QETableRow>[] {
    return [
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
                const qe: QE = qeFromString(row.original.qeString);

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => onDeleteRequest(qe)}>
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onReassignRequest(qe)}>
                                Reassign
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ];
}