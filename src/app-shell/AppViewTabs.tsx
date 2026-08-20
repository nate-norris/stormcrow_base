import { CrosshairIcon, SheetIcon } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ViewOptions } from "./models";

type Props = {
  view: ViewOptions;
  onChange: (value: ViewOptions) => void;
}

export function AppViewTabs({ view, onChange }: Props) {
  return (
    <Tabs value={view} onValueChange={(value) => onChange(value as ViewOptions)} className="w-full">
      <TabsList className="bg-card">
        <TabsTrigger 
          className="data-[state=active]:bg-secondary dark:data-[state=active]:bg-secondary"
          value="logging">
          Logging <CrosshairIcon />
        </TabsTrigger>
        <TabsTrigger 
          className="data-[state=active]:bg-secondary dark:data-[state=active]:bg-secondary"
          value="qes">
          QE Table <SheetIcon />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}