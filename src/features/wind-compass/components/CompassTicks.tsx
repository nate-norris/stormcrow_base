import { useAtomValue } from "jotai";
import { activeWindConfigAtom } from "@/features/wind-warnings";

const INNER_RADIUS = 86;
const TICK_INTERVAL = 15;

export function CompassTicks() {
    const config = useAtomValue(activeWindConfigAtom);
    const gunAzimuth = config.gunOrient * -1;

    const ticks = Array.from(
        { length: 360 / TICK_INTERVAL },
        (_, index) => index * TICK_INTERVAL
    );

    return (
        <>
            {ticks.map(angle => {
                const isMajor = angle % 45 === 0;
                const isCardinal = angle % 90 === 0;
                if (isCardinal) return null;

                return (
                    <line
                        key={angle}
                        x1={100}
                        y1={100 - INNER_RADIUS}
                        x2={100}
                        y2={100 - INNER_RADIUS - (isMajor ? 8 : 5)}
                        stroke="currentColor"
                        strokeWidth={isMajor ? 1 : 0.5}
                        transform={`rotate(${angle+gunAzimuth} 100 100)`}
                    />
                );
            })}
        </>
    );
}