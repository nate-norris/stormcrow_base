export const WEAPONS = {
    hk416: "HK416",
    m249: "M249",
    shnipes: "Shnipes",
    mp7: "MP7",
    ma5b: "MA5B",
    sword: "Energy Sword",
} as const;

export type WeaponKey = keyof typeof WEAPONS;