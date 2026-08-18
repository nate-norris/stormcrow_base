import { useAtomValue } from "jotai";

import { activeWindConfigAtom } from "@/features/wind-warnings";
import { SITE_COLORS } from "@/lib/siteColors";
import type { CompassEvent } from '../core/compassEvent';

const TRIANGLE_MAX_Y_SHIFT = 79;
const LINE_MAX_Y_SHIFT = 86;

interface Props {
    siteId: string;
    event: CompassEvent;
    radius: number;
}
export function WindVector({ siteId, event, radius }: Props) {
    const config = useAtomValue(activeWindConfigAtom);
    const vectorAngle = (config.gunOrient * -1) + event.orientation;
    const transform = `rotate(${vectorAngle} 100 100)`;

    const ratio = Math.min(event.windFull / config.maxWind, 1);
    const yShift = ratio * TRIANGLE_MAX_Y_SHIFT;
    const yShiftLine = ratio * LINE_MAX_Y_SHIFT;
    const arrowPoints = `
        100,${92-yShift}
        96,${100-yShift}
        104,${100-yShift}
    `

    return (
        <>
            {/* arrow line */}
            <line
                key={siteId}
                x1={100}
                y1={100}
                x2={100}
                y2={(186-yShiftLine-radius)}
                stroke={SITE_COLORS[siteId]}
                strokeWidth={2}
                transform={transform}
            />
            {/* arrow tip */}
            <polygon
                points={arrowPoints}
                fill={SITE_COLORS[siteId]}
                transform={transform}
            />
            {/* site id bubble */}
            <g transform={transform}>
                <circle
                    cx={100}
                    cy={8}
                    r={5}
                    fill={SITE_COLORS[siteId]}
                />

                <text
                    x={100}
                    y={8}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="text-[5px] font-bold text-alternate-foreground fill-current"
                    transform={`rotate(${-vectorAngle} 100 8)`}
                >
                    {siteId}
                </text>
            </g>
        </>
    );
}