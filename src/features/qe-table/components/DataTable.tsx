import { useTable, type ColumnDef, type RowData, type SortingState, 
  type ColumnFiltersState, OnChangeFn } from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input"

import { features, type DataTableFeatures } from "../core/tableFeatures";

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];

  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;

  columnFilters: ColumnFiltersState;
  onFiltersChange: OnChangeFn<ColumnFiltersState>;
}

export function DataTable<TData extends RowData>(
  {columns, data, sorting, onSortingChange, columnFilters, onFiltersChange}: 
  DataTableProps<TData>) {

  const table = useTable({
    features,
    data,
    columns,
    onSortingChange: onSortingChange,
    onColumnFiltersChange: onFiltersChange,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="overflow-hidden rounded-md">
      {/* Input Filter QE */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter QE..."
          value={(table.getColumn("qeString")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("qeString")?.setFilterValue(event.target.value)
          }
          className="bg-input text-foreground focus-visible:ring-0 
            transition-none max-w-sm"
        />
      </div>

      <Table>
        {/* Column header */}
        <TableHeader className="bg-panel panel-foreground">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-panel">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-center">
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        {/* Table body */}
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="text-center bg-panel hover:bg-card"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-120 bg-panel 
                panel-foreground text-center font-semibold text-lg"> 
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
