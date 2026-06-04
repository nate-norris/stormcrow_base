import { FiringView } from "@/components/layouts/FiringView";
import { QETableView } from "@/components/layouts/QETableView";

export function LayoutRouter({ view }: {view: string}) {
  switch (view) {
    case "logging":
      return <FiringView />;
    case "qes":
      return <QETableView />;
  }
}