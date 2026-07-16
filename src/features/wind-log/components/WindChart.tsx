
import { Chart } from "./Chart";

export function WindChart() {
  return (
    <div className="w-full h-full p-4">
      <div className="w-full h-full rounded-lg border-2 border-zinc-600 bg-black/10">
        <Chart />
      </div>
    </div>
  )
}