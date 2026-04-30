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

export function AppMenu({ onOpenTestManagement }: Props) {
    return (
        <div className="w-full flex items-center px-2 py-1 border-b bg-gray-50">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-2">
                    File
                </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={onOpenTestManagement}>
                    Test Management
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}