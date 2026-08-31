import { useAtomValue } from "jotai";
import { SettingsIcon, RadioTowerIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { WeatherSites } from "@/features/incoming-weather";
import { WindWarningForm } from "@/features/wind-warnings";
import { QEForm } from "@/features/qe-logging";
import { WindChart } from "@/features/wind-log";
import { WindCompass } from "@/features/wind-compass";
import { activeTestAtom } from "@/features/test-session";
import { EmptyTestSelectionPrompt } from "@/features/test-session";

export function LoggingView() {
  const test = useAtomValue(activeTestAtom);

  return (
    <div className="flex h-full min-h-0">
      {/* LEFT SIDE PANEL */}
      <div className="w-1/5 max-w-150 min-w-96 p-2 min-h-0 flex flex-col bg-sidebar">
        <Accordion type="multiple" defaultValue={["sites", "config"]} className="flex-1 overflow-auto [scrollbar-gutter:stable]">
          <AccordionItem value="sites">
            <AccordionTrigger className="pl-6">
              <span className="flex items-center gap-2">
                <RadioTowerIcon />
                Weather Sites
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div>
                <WeatherSites />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="config">
            <AccordionTrigger className="pl-6">
              <span className="flex items-center gap-2">
                <SettingsIcon />
                Test Configuration
              </span>
            </AccordionTrigger>
            <AccordionContent><WindWarningForm /></AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* RIGHT SIDE */}
      {!test ?
        // display only test selection if no active test
        <div className="flex flex-1">
          <EmptyTestSelectionPrompt />
        </div>
        :
        // display dashboard with active test selected
        <div className="flex flex-1 min-h-0 flex-col">
          <div className="flex shrink-0 gap-6 pl-6 pr-6 pt-6">
              <div className="flex-1 min-w-96">
                  <QEForm />
              </div>
              <div className="w-96 shrink-0">
                <WindCompass />
              </div>
          </div>

          <div className="flex-1 min-h-0">
              <WindChart />
          </div>
        </div>
      }
    </div>
  );
}