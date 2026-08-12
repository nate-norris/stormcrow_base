import { useAtomValue } from "jotai";
import { ResponsiveContainer, LineChart, XAxis, YAxis, Line, CartesianGrid,
    ReferenceLine } from "recharts";

import { siteIdsAtom } from "@/features/incoming-weather";
import { activeWindConfigAtom } from "@/features/wind-warnings";
import { clockAtom } from "@/state";
import { WIND_WINDOW, SITE_COLORS } from "../core/constants";
import type { WindChartPoint } from "../core/windChartPoint";

type ChartProps = {
    data: WindChartPoint[];
    label: string;
};

export function Chart({ data, label }: ChartProps) {
    const siteIds = useAtomValue(siteIdsAtom);
    const now = useAtomValue(clockAtom);
    const config = useAtomValue(activeWindConfigAtom);

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
                        value: label,
                        angle: -90,
                        position: "insideLeft",
                        fill: "#ffffff",
                        dy: 40,
                    }}
                    tick={{ fill: "#ffffff" }}
                    domain={[0, 'auto']}
                />

                {siteIds.map(siteId => (
                    <Line
                        key={siteId}
                        dataKey={siteId}
                        type="linear"
                        stroke={SITE_COLORS[siteId ?? "#ffffff"]}
                        dot={false}
                        connectNulls={false}
                        isAnimationActive={false}
                        strokeWidth={3}
                        strokeOpacity={0.9}
                    />
                ))}

                {/* maximum wind limit */}
                <ReferenceLine
                    y={config.maxWind}
                    stroke="red"
                    strokeDasharray="6 6"
                />

                {/* theshold wind limit warning */}
                <ReferenceLine
                    y={config.maxWind * config.thresholdPercent / 100}
                    stroke="yellow"
                    strokeDasharray="6 6"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}