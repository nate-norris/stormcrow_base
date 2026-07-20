import { ReactNode } from "react";

export function TopNav({ left, center, right }: { left: ReactNode; center: ReactNode, right: ReactNode }) {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-border bg-card flex items-center">
      <div className="flex items-center w-full px-4">
        <div className="flex-shrink-0">{left}</div>
        <div className="absolute left-1/2 -translate-x-1/2">{center}</div>
        <div className="ml-auto text-xs font-semibold text-muted-foreground">{right}</div>
      </div>
    </div>
  );
}