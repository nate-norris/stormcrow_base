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

export function LoggingView() {
  return (
    <div className="flex h-full min-h-0">
      {/* LEFT SIDE PANEL */}
      <div className="w-1/5 max-w-96 min-w-72 p-2 min-h-0 flex flex-col bg-gray-500">
        <Accordion type="multiple" defaultValue={["sites"]} className="flex-1 overflow-auto">
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
      <div className="flex-1 min-h-0 bg-gray-400">
        <QEForm />
      </div>
    </div>
  );
}