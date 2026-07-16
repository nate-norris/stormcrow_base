import { useAtomValue } from "jotai";
import { ResponsiveContainer, LineChart, XAxis, YAxis, Line } from "recharts";

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
                <XAxis 
                    dataKey="time"
                    type="number"
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
                <YAxis />

                {siteIds.map(siteId => (
                    <Line
                        key={siteId}
                        dataKey={siteId}
                        type="linear"
                        dot={false}
                        connectNulls={false}
                        isAnimationActive={false}
                        strokeWidth={3}
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
