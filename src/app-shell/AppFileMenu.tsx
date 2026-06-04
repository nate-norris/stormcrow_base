import { Menu } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

type Props = {
    onOpenTestManagement: () => void;
}

export function AppFileMenu({ onOpenTestManagement }: Props) {
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
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}