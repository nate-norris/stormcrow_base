import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils"

interface Props {
  val: string;
  setVal: (value: string) => void;
}

export function NorthingEastingInput({ val, setVal }: Props) {

    return (
        <Input
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className={cn(
                "bg-input text-foreground",
                "focus-visible:ring-0",
                "transition-none",
            )}
        />
    );
}