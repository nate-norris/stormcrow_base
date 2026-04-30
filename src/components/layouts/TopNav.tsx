import { ReactNode } from "react";

export function TopNav({ left, center }: { left: ReactNode; center: ReactNode }) {
  return (
    <div className="sticky top-0 z-50 h-12 w-full border-b bg-white flex items-center">
      <div className="flex items-center w-full px-4">
        <div className="flex-shrink-0">{left}</div>
        <div className="absolute left-1/2 -translate-x-1/2">{center}</div>
      </div>
    </div>
  );
}