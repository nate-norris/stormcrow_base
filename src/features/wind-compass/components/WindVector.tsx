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
    const gunAzimuth = config.gunOrient * -1;

    const ratio = Math.min(event.windFull / config.maxWind, 1);
    const yShift = ratio * TRIANGLE_MAX_Y_SHIFT;
    const yShiftLine = ratio * LINE_MAX_Y_SHIFT;

    return (
        <>
            <line
                key={siteId}
                x1={100}
                y1={100}
                x2={100}
                y2={(186-yShiftLine-radius)}
                stroke={SITE_COLORS[siteId]}
                strokeWidth={2}
                transform={`rotate(${gunAzimuth+event.orientation} 100 100)`}
            />
            <polygon
                points={`
                    100,${92-yShift}
                    96,${100-yShift}
                `}
                fill={SITE_COLORS[siteId]}
                transform={`rotate(${gunAzimuth+event.orientation} 100 100)`}
            />
        </>
    );
}