import { QETable } from "@/features/qe-table";
import { ExportDataButton } from "@/features/qe-export";

export function QETableView() {
  return (
    <div className="h-full min-h-0 overflow-auto">
      <div className="container mx-auto">
        <div className="ml-auto w-32">
          <ExportDataButton />
        </div>
      </div>
      <QETable />
    </div>
  );
}