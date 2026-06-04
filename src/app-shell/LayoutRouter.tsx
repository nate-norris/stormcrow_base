import { LoggingView } from "@/components/layouts/LoggingView";
import { QETableView } from "@/components/layouts/QETableView";

export function LayoutRouter({ view }: {view: string}) {
  switch (view) {
    case "logging":
      return <LoggingView />;
    case "qes":
      return <QETableView />;
  }
}