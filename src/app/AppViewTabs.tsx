import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  view: string;
  onChange: (value: string) => void;
}

export function AppTabs({ view, onChange }: Props) {
  return (
    <Tabs value={view} onValueChange={onChange} className="w-full">
      <TabsList>
        <TabsTrigger value="firing">Firing</TabsTrigger>
        <TabsTrigger value="qes">QE Table</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}