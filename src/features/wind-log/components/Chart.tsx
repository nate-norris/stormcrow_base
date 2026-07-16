import { useAtomValue } from "jotai";
import { ResponsiveContainer, LineChart, XAxis, YAxis, Line, CartesianGrid,
    Legend } from "recharts";

import { windChartDataAtom } from "../state/windChartDataAtom";
import { siteIdsAtom } from "@/features/incoming-weather";
import { clockAtom } from "@/state";
import { WIND_WINDOW } from "../core/constants";

export function Chart() {
    const siteIds = useAtomValue(siteIdsAtom);
    const data = useAtomValue(windChartDataAtom);
    const now = useAtomValue(clockAtom);

    const xTicks = Array.from({ length: 4 }, (_, i) =>
        now - WIND_WINDOW + (WIND_WINDOW / 3) * i
    );

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart 
                data={data}
                margin={{
                    top: 5,
                    right: 20,
                    left: 0,
                    bottom: 5,
                }}
            >
                <Legend />
                <CartesianGrid 
                    vertical={true}
                    stroke="#ffffff"
                    // horizontal={true}
                />
                <XAxis 
                    dataKey="time"
                    type="number"
                    axisLine={false}
                    stroke="#ffffff"//"#9ca3af"
                    domain={[
                        now - WIND_WINDOW,
                        now
                    ]}
                    allowDataOverflow
                    ticks={xTicks}
                    tickFormatter={(value) =>
                        `t-${Math.round((now - value) / 1000)}`
                    }
                />
                <YAxis
                    stroke="#ffffff"
                    axisLine={false}
                    label={{
                        value: "Wind (m/s)",
                        angle: -90,
                        position: "insideLeft",
                        fill: "#ffffff"
                    }}
                    tick={{ fill: "#ffffff" }}
                    domain={[0, 'auto']}
                    // ticks={[0, 5, 10, 15, 20, 25, 30]}
                />

                {siteIds.map(siteId => (
                    <Line
                        key={siteId}
                        dataKey={siteId}
                        type="linear"
                        dot={false}
                        connectNulls={false}
                        isAnimationActive={false}
                        strokeWidth={3}
                        strokeOpacity={0.9}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
}



// ✅ Responsive sizing.
// ✅ Tooltip.
// ✅ Multiple sites.
// ✅ Nice colors.
// ✅ Reference lines.
// ✅ Stale data styling.
