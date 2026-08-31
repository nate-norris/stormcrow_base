import { useTheme } from "next-themes";
import { useAtomValue } from "jotai";


import { weaponSelectionAtom } from "../state/selectedWeaponAtom";
import { getWeaponImage } from "../core/getWeaponImage";

export function Weapon() {
    const selectedWeapon = useAtomValue(weaponSelectionAtom);
    const { resolvedTheme } = useTheme();

    const weaponImage = getWeaponImage(
        resolvedTheme as "light" | "dark", 
        selectedWeapon
    );

    return (
        <>
            <image
                href={weaponImage?.src}
                x={25}
                y={54 + (weaponImage?.offset ?? 0)}
                width={150}
                height={105}
                preserveAspectRatio="xMidYMid meet"
                transform="rotate(90 100 100)"
            />
        </>
    );
}