
import { Chart } from "./Chart";

export function WindChart() {
  return (
    <div className="w-full h-full p-4">
      <div className="w-full h-full rounded-lg shadow-md shadow-black/30 bg-black/10 pt-2 px-2">
        <Chart />
      </div>
    </div>
  )
}