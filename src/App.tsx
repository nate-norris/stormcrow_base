import "./index.css";
import { useEffect, useState } from "react";
import { Provider } from "jotai";

import { store } from "@/state";
import { bootstrapApp } from "./bootstrap";
import { TestModal } from "./features/test-session";
import { TopNav } from "@/components/layouts/TopNav";
import { FiringView } from "@/components/layouts/FiringView";
import { QETableView } from "@/components/layouts/QETableView";
import { AppTabs, AppMenu } from "@/features/navigation";

function App() {
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
  const [view, setView] = useState("firing");

  useEffect(() => {
    bootstrapApp();
  }, []);

  const handleTestManagementClose = () => {
    setIsTestManagementOpen(false);
    setIsBooting(false); // will always be false after boot
  }

  return (
    <Provider store={store}>
      <div className="min-h-screen w-full flex flex-col">
        <TopNav 
          left={<AppMenu onOpenTestManagement={() => setIsTestManagementOpen(true)}/>}
          center={<AppTabs view={view} onChange={setView} />}
        />

        <main className="flex-1 overflow-hidden">
          {view === "firing" && <FiringView />}
          {view === "qes" && <QETableView />}
        </main>
        
        {/* Allow modified step upon app startup */}
        <TestModal
          isOpen={isTestManagementOpen}
          entryMode={isBooting ? "continue-if-possible" : "menu"}
          onClose={handleTestManagementClose}
        />
      </div>
    </Provider>
  );
}

export default App;