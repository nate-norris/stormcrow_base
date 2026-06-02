import { useState } from "react";

import { LayoutRouter } from "./LayoutRouter";
import { TopNav } from "@/components/layouts/TopNav";
import { AppViewTabs } from "./AppViewTabs";
import { AppFileMenu } from "./AppFileMenu";
import { ViewOptions } from "./models";
import { TestModal } from "@/features/test-session";

export default function AppCoordinator() {
  // Test session configuration including adding, deleting or continuing
  //    previous test sessions.
  //
  // TestModal can be revealed by:
  // 1. On booting the test session should be selected
  // 2. When the user selects the option from the app menu
  //
  // TestModal can be hidden by:
  // 1: Selecting outside of the modal
  // 2: Selecting the exit button within the modal
  // 3: Finilizing actions within the modal (New/Continue)
  const [isTestManagementOpen, setIsTestManagementOpen] = useState<boolean>(true);
  const [isBooting, setIsBooting] = useState<boolean>(true);
  // const [view, setView] = useState("firing");
  const [view, setView] = useState<ViewOptions>("firing");

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