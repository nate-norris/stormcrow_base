import { useAtomValue } from "jotai";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { WeatherSites } from "@/features/incoming-weather";
import { WindWarningForm } from "@/features/wind-warnings";
import { QEForm } from "@/features/qe-logging";
import { WindChart } from "@/features/wind-log";
import { activeTestAtom } from "@/features/test-session";
import { EmptyTestSelectionPrompt } from "@/features/test-session";

export function LoggingView() {
  const test = useAtomValue(activeTestAtom);

  return (
    <div className="flex h-full min-h-0">
      {/* LEFT SIDE PANEL */}
      <div className="w-1/5 max-w-96 min-w-72 p-2 min-h-0 flex flex-col bg-sidebar">
        <Accordion type="multiple" defaultValue={["sites"]} className="flex-1 overflow-auto [scrollbar-gutter:stable]">
          <AccordionItem value="sites" className="">
            <AccordionTrigger>Weather Sites</AccordionTrigger>
            <AccordionContent className="h-96">
              <ScrollArea className="h-full">
                <WeatherSites />
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="config">
            <AccordionTrigger>Wind Configuration</AccordionTrigger>
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
          <div className="flex shrink-0 gap-6 p-8">
              <div className="flex-1 min-w-0">
                  <QEForm />
              </div>
              <div className="w-96 shrink-0">
                {/* TODO: placeholder for WindCompass */}
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