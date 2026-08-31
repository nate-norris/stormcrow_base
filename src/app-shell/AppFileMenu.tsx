import { Menu, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useAtom } from "jotai";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { weaponSelectionAtom, WEAPONS, type WeaponKey } from "@/features/wind-compass";

type Props = {
    onOpenTestManagement: () => void;
}

export function AppFileMenu({ onOpenTestManagement }: Props) {
    const { theme, setTheme } = useTheme();
    const [weapon, setWeapon]  = useAtom(weaponSelectionAtom);
    return (
        <div className="w-full flex items-center px-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="px-2">
                        <Menu className="size-6" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={onOpenTestManagement}>
                        Test Management
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Help
                    </DropdownMenuItem>
                    {/* Light / Dark Theme */}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            Theme
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuRadioGroup
                                value={theme}
                                onValueChange={setTheme}
                            >
                                <DropdownMenuRadioItem value="light">
                                    <Sun />
                                    Light
                                </DropdownMenuRadioItem>

                                <DropdownMenuRadioItem value="dark">
                                    <Moon />
                                    Dark
                                </DropdownMenuRadioItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuRadioItem value="system">
                                    <Monitor />
                                    System
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>

                    {/* Weapon Selection */}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            Weapon
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuRadioGroup
                                    value={weapon}
                                    onValueChange={(value) => setWeapon(value as WeaponKey)}
                                >
                                {Object.entries(WEAPONS).map(([key, name]) => (
                                    <DropdownMenuRadioItem
                                        value={key}
                                        key={key}
                                        onSelect={() => setWeapon(key as WeaponKey)}
                                    >
                                        {name}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
