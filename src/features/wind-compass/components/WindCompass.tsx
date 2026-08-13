import { useTheme } from "next-themes";

import rifleLight from "../images/rifleLight.png";
import rifleDark from "../images/rifleDark.png";

export function WindCompass() {
    const { resolvedTheme } = useTheme();
    const rifle = resolvedTheme === "dark" ? rifleLight : rifleDark;
    
    return (
        <div className="w-full aspect-square">
            <svg
                width="400"
                height="400"
                viewBox="0 0 200 200" 
                className="w-full h-full text-secondary-foreground"
            >
                <circle
                    cx={100}
                    cy={100}
                    r={95}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1}
                />
                {/* rifle orientation always up */}
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
            </svg>
        </div>
    );
}