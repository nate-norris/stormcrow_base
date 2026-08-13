import { useTheme } from "next-themes";

import rifleLight from "../images/rifleLight.png";
import rifleDark from "../images/rifleDark.png";

export function MA5B() {
    const { resolvedTheme } = useTheme();
    const rifle = resolvedTheme === "dark" ? rifleLight : rifleDark;

    return (
        <>
            <image
                href={rifle}
                x={25}
                y={50}
                width={150}
                height={105}
                preserveAspectRatio="xMidYMid meet"
                transform="rotate(90 100 100)"
            />
        </>
    );
}