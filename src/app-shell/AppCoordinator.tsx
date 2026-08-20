import { useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { ClipboardListIcon } from "lucide-react";

import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { LayoutRouter } from "./LayoutRouter";
import { TopNav } from "@/components/layouts/TopNav";
import { AppViewTabs } from "./AppViewTabs";
import { AppFileMenu } from "./AppFileMenu";
import { ViewOptions } from "./models";
import { TestModal } from "@/features/test-session";
import { default as HelpPage } from "@/pages/HelpPage";
import { isTestModalOpenAtom, isHelpOpenAtom } from "./state";
import { activeTestAtom } from "@/features/test-session";

export default function AppCoordinator() {

  // test modal open atom configued to properly close on startup and
  //    allow TestModal to open/close
  const [isTestManagementOpen, setIsTestManagementOpen] = useAtom(isTestModalOpenAtom);
  const test = useAtomValue(activeTestAtom);
  // help page open
  const [isHelpOpen, setIsHelpOpen] = useAtom(isHelpOpenAtom);
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
        right={
          <span className="flex gap-2 items-center">
            {/* only display test name if test selected */}
            {test? test.name: ""}
            {/* test management button/tooltip */}
            <Tooltip>
              <TooltipTrigger asChild>
                  <Button
                      variant="secondary"
                      size="icon"
                      className="size-7 rounded-full"
                      onClick={() => setIsTestManagementOpen(true)}
                  >
                      <ClipboardListIcon className="size-4" />
                  </Button>
              </TooltipTrigger>
              <TooltipContent>
                  Test Management
              </TooltipContent>
            </Tooltip>
          </span>
        }
      />

      <main className="flex-1 min-h-0">
        <LayoutRouter view={view} />
      </main>

      <TestModal
          isOpen={isTestManagementOpen}
          entryMode={isBooting ? "continue-if-possible" : "menu"}
          onClose={handleTestManagementClose}
        />

      {/* {isHelpOpen &&
        <HelpPage />
      } */}
    </div>
  );
}