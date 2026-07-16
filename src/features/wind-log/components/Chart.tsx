import { useAtomValue } from "jotai";
import { ResponsiveContainer, LineChart, XAxis, YAxis, Line } from "recharts";

import { windChartDataAtom } from "../state/windChartDataAtom";
import { siteIdsAtom } from "@/features/incoming-weather";
// import { WIND_WINDOW } from "../core/constants";

export function Chart() {
    const siteIds = useAtomValue(siteIdsAtom);
    const data = useAtomValue(windChartDataAtom);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <XAxis 
                    dataKey="time"
                    type="number"
                    // domain={[
                    //     now - WIND_WINDOW,
                    //     now
                    // ]}
                />
                <YAxis />

                {siteIds.map(siteId => (
                    <Line
                        key={siteId}
                        dataKey={siteId}
                        type="linear"
                        dot={false}
                        connectNulls={false}
                        // isAnimationActive={false}
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
