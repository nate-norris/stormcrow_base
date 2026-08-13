import { useTheme } from "next-themes";
import { useAtomValue } from "jotai";

import rifleLight from "../images/rifleLight.png";
import rifleDark from "../images/rifleDark.png";
import { activeWindConfigAtom } from "@/features/wind-warnings";

export function WindCompass() {
    const { resolvedTheme } = useTheme();
    const rifle = resolvedTheme === "dark" ? rifleLight : rifleDark;
    const config = useAtomValue(activeWindConfigAtom);

    const gunAzimuth = config.gunOrient * -1;
    const max = config.maxWind;
    const threshold = config.thresholdPercent;

    return (
        <div className="w-full aspect-square">
            <svg
                width="400"
                height="400"
                viewBox="0 0 200 200" 
                className="w-full h-full text-secondary-foreground"
            >
                {/* outer compass ring */}
                <circle
                    cx={100}
                    cy={100}
                    r={99}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1}
                />
                {/* inner compass ring */}
                <circle
                    cx={100}
                    cy={100}
                    r={86}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={0.5}
                />
                {/* rifle orientation: always up */}
                <image
                    href={rifle}
                    x={25}
                    y={50}
                    width={150}
                    height={105}
                    preserveAspectRatio="xMidYMid meet"
                    transform="rotate(90 100 100)"
                />
                {/* center point */}
                <circle
                    cx={100}
                    cy={100}
                    r={3}
                    fill="red"
                />
                {/* Cardinal directions */}
                <text
                    x={100}
                    y={12}
                    textAnchor="middle"
                    className="font-extralight text-xs fill-current"
                    transform={`rotate(${gunAzimuth} 100 100)`}
                >
                    N
                </text>
            </svg>
        </div>
    );
}