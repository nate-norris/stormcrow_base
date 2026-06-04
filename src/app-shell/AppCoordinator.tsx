import { useState } from "react";
import { useAtom } from "jotai";

import { LayoutRouter } from "./LayoutRouter";
import { TopNav } from "@/components/layouts/TopNav";
import { AppViewTabs } from "./AppViewTabs";
import { AppFileMenu } from "./AppFileMenu";
import { ViewOptions } from "./models";
import { TestModal } from "@/features/test-session";
import { isTestModalOpenAtom } from "./state";

export default function AppCoordinator() {

  // test modal open atom configued to properly close on startup and
  //    allow TestModal to open/close
  const [isTestManagementOpen, setIsTestManagementOpen] = useAtom(isTestModalOpenAtom);
  // booting only once to allow continue in TestModal view
  const [isBooting, setIsBooting] = useState<boolean>(true);
  // view changes by TopNav
  const [view, setView] = useState<ViewOptions>("logging");

  const handleTestManagementClose = () => {
    setIsTestManagementOpen(false);
    setIsBooting(false); // will always be false after boot
  }

  return (
    <div className="flex h-screen w-full flex-col">

      <TopNav
        left={<AppFileMenu onOpenTestManagement={() => setIsTestManagementOpen(true)}/>}
        center={<AppViewTabs view={view} onChange={setView} />}
      />

      <main className="flex-1 min-h-0">
        <LayoutRouter view={view} />
      </main>

      <TestModal
          isOpen={isTestManagementOpen}
          entryMode={isBooting ? "continue-if-possible" : "menu"}
          onClose={handleTestManagementClose}
        />
    </div>
  );
}