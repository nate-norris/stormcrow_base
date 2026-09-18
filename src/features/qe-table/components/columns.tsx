import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type QE, qeFromString } from "@/features/qe";

import type { QETableRow } from "../core/tableRow";
import { type DataTableFeatures } from "../core/tableFeatures";

interface Props {
  onDeleteRequest: (qe: QE) => void,
  onReassignRequest: (qe: QE) => void,
}

export function getColumns({ onDeleteRequest, onReassignRequest}: Props): 
  ColumnDef<DataTableFeatures, QETableRow>[] {

  const columnHelper = createColumnHelper<DataTableFeatures, QETableRow>();

  const columns = columnHelper.columns([
    columnHelper.accessor("qeString", {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:!bg-primary hover:!text-primary-foreground"
        >
          {column.getIsSorted() ? 
            <ArrowUpDown className="ml-2 h-4 w-4" /> : 
            <></>
          }
          QE
        </Button>
      ),
    }),
    columnHelper.accessor("dodic", {
      header: "DODIC",
    }),
    columnHelper.accessor("lot", {
      header: "LOT",
    }),
    columnHelper.accessor("siteId", {
      header: "Site",
    }),
    columnHelper.accessor("windFull", {
      header: "Wind",
    }),
    columnHelper.accessor("windDirection", {
      header: "Wind \u00b0",
    }),
    columnHelper.accessor("temp", {
      header: "\u00b0 F",
    }),
    columnHelper.accessor("humidity", {
      header: "Hum",
    }),
    columnHelper.accessor("baro", {
      header: "inHg",
    }),
    columnHelper.accessor("time", {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:!bg-primary hover:!text-primary-foreground"
        >
          {column.getIsSorted() ? 
            <ArrowUpDown className="ml-2 h-4 w-4" /> : 
            <></>
          }
          Time
        </Button>
      ),
      cell: ({row }) => {
        return new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        }).format(new Date(row.getValue<number>("time")));
      },
    }),
    columnHelper.display({
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
    }),
  ]);
  
  return columns;
}
