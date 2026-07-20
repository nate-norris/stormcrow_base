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
        <TabsTrigger value="logging">Logging</TabsTrigger>
        <TabsTrigger value="qes">QE Table</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}