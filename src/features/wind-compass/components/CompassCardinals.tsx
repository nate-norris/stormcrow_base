import { useAtomValue } from "jotai";

import { activeWindConfigAtom } from "@/features/wind-warnings";

const CARDINAL_DIRECTIONS = [
    { label: "N", x: 100, y: 12 },
    { label: "E", x: 192, y: 104 },
    { label: "S", x: 100, y: 196 },
    { label: "W", x: 8, y: 104 },
];


export function CompassCardinals() {
    const config = useAtomValue(activeWindConfigAtom);
    const gunAzimuth = config.gunOrient * -1;

    return (
        <>
            {CARDINAL_DIRECTIONS.map(({ label, x, y }) => (
                <text
                    key={label}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    className="font-extralight text-xs fill-current"
                    transform={`rotate(${gunAzimuth} 100 100)`}
                >
                    {label}
                </text>
            ))}
        </>
    );
}