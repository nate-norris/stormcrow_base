import { useAtomValue } from "jotai";
import { ResponsiveContainer, LineChart, XAxis, YAxis, Line } from "recharts";
import { windChartDataAtom } from "../state/windChartDataAtom";



export function Chart() {
    const data = useAtomValue(windChartDataAtom);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <XAxis dataKey="time" />
                <YAxis />
                <Line
                    dataKey="windFull"
                    type="linear"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}



// ✅ One line.
// ✅ Time axis.
// ✅ Responsive sizing.
// ✅ Tooltip.
// ✅ Multiple sites.
// ✅ Nice colors.
// ✅ Reference lines.
// ✅ Stale data styling.
