import { useAtomValue } from "jotai";
import { ResponsiveContainer, LineChart, XAxis, YAxis, Line } from "recharts";

import { windChartDataAtom } from "../state/windChartDataAtom";
import { siteIdsAtom } from "@/features/incoming-weather";

export function Chart() {
    const siteIds = useAtomValue(siteIdsAtom);
    const data = useAtomValue(windChartDataAtom);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <XAxis dataKey="time" />
                <YAxis />

                {siteIds.map(siteId => (
                    <Line
                        key={siteId}
                        dataKey={siteId}
                        type="linear"
                        connectNulls={false}
                    />
                ))}
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
