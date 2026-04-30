import "./index.css";
import { useEffect, useState } from "react";
import { Provider } from "jotai";

import { store } from "@/state";
import { bootstrapApp } from "./bootstrap";
import { TestModal } from "./features/test-session";
import { TopNav } from "@/components/layouts/TopNav";
import { AppTabs } from "@/components/layouts/TabsNav";
import { AppMenu } from "@/components/layouts/AppMenu";
import WeatherSites from "@/components/widgets/WeatherSites"

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
          center={<AppTabs />}
        />
        
        <WeatherSites />
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