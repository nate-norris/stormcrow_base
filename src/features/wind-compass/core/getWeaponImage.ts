// file path aliases
// TODO: add in light version for each weapon
import hk416Light from "../images/light_hk416.png";
import hk416Dark from "../images/dark_hk416.png";
import ma5bLight from "../images/light_ma5b.png";
import ma5bDark from "../images/dark_ma5b.png";
import swordLight from "../images/light_sword.png";
import swordDark from "../images/dark_sword.png";
import m249Light from "../images/dark_m249.png";
import m249Dark from "../images/dark_m249.png";
import shnipesLight from "../images/dark_shnipes.png";
import shnipesDark from "../images/dark_shnipes.png";
import mp7Light from "../images/dark_mp7.png";
import mp7Dark from "../images/dark_mp7.png";

import type { WeaponKey } from "./weaponKeys";

export interface SvgImage {
    src: string,
    offset: number,
}

const WEAPON_IMAGES = {
    hk416: {
        light: {
            src: hk416Light,
            offset: -1,
        },
        dark: {
            src: hk416Dark,
            offset: -1,
        },
    },

    m249: {
        light: {
            src: m249Light,
            offset: 4,
        },
        dark: {
            src: m249Dark,
            offset: 4,
        },
    },

    shnipes: {
        light: {
            src: shnipesLight,
            offset: -2,
        },
        dark: {
            src: shnipesDark,
            offset: -2,
        },
    },

    mp7: {
        light: {
            src: mp7Light,
            offset: 0,
        },
        dark: {
            src: mp7Dark,
            offset: 0,
        },
    },

    ma5b: {
        light: {
            src: ma5bLight,
            offset: 0,
        },
        dark: {
            src: ma5bDark,
            offset: 0,
        },
    },

    sword: {
        light: {
            src: swordLight,
            offset: 0,
        },
        dark: {
            src: swordDark,
            offset: -6,
        },
    },
} satisfies Record<WeaponKey, Record<"light" | "dark", SvgImage>>;

export function getWeaponImage(theme: "light" | "dark" | undefined,
    weapon: WeaponKey): SvgImage | undefined {
    if (!theme) return undefined;

    return WEAPON_IMAGES[weapon][theme];
}