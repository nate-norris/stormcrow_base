import { useAtomValue } from "jotai";
import { Chart } from "./Chart";
import { crossWindChartDataAtom, headTailWindChartDataAtom } from "../state/windChartDataAtom";
import { ChartLegend } from "./ChartLegend";

export function WindChart() {
  const crossData = useAtomValue(crossWindChartDataAtom);
  const headTailData = useAtomValue(headTailWindChartDataAtom);

  return (
    <div className="w-full h-full p-4">
      <div className="w-full h-full flex shadow-md shadow-black/30 rounded-lg bg-black/10 dark:bg-black/50 overflow-hidden">
        
        <div className="flex-1 min-w-0 min-h-0 flex flex-col">
          <div className="flex-1 min-h-0 pt-2 px-2">
            <Chart data={crossData} label={"Cross (m/s)"} />
          </div>

          <div className="flex-1 min-h-0 pt-2 px-2">
            <Chart data={headTailData} label={"H/T (m/s)"}/>
          </div>
        </div>

        <div className="w-14 min-h-0">
          <ChartLegend />
        </div>
      </div>
    </div>
  );
}