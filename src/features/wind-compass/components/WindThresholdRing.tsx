import { useAtomValue } from "jotai";

import { activeWindConfigAtom } from "@/features/wind-warnings";

interface WindThresholdRingProps {
    radius: number;
}

export function WindThresholdRing({ radius }: WindThresholdRingProps) {
    const threshold = useAtomValue(activeWindConfigAtom).thresholdPercent;
    const tRadius = radius * threshold / 100;

    return (
        <circle
            cx={100}
            cy={100}
            r={tRadius}
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            strokeDasharray="4 3"
            className="text-amber-500"
        />
    );
}