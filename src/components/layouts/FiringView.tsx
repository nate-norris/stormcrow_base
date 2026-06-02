import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { WeatherSites } from "@/features/incoming-weather";
import { WindWarningForm } from "@/features/wind-warnings";

export function FiringView() {
  return (
    <div className="flex h-full">
      {/* LEFT SIDE PANEL */}
      <div className="w-1/5 max-w-96 min-w-64 p-2">
        <Accordion type="multiple" defaultValue={["sites"]}>
          <AccordionItem value="sites">
            <AccordionTrigger>Weather Sites</AccordionTrigger>
            <AccordionContent><WeatherSites /></AccordionContent>
          </AccordionItem>
          <AccordionItem value="config">
            <AccordionTrigger>Wind Configuration</AccordionTrigger>
            <AccordionContent><WindWarningForm /></AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 bg-gray-500">
        {/* Main content here */}
      </div>
    </div>
  );
}

// min-h-0, h-full, h-screen