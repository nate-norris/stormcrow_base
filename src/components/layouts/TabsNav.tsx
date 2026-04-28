import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function AppTabs() {
  return (
    <Tabs defaultValue="firing" className="w-full">
      <TabsList>
        <TabsTrigger value="firing">Firing</TabsTrigger>
        <TabsTrigger value="qes">QE Table</TabsTrigger>
        <TabsTrigger value="range">Range</TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard">...</TabsContent>
      <TabsContent value="qes">...</TabsContent>
      <TabsContent value="range">...</TabsContent>
    </Tabs>
  );
}