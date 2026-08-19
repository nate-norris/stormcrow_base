import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils"

interface Props {
  val: string;
  setVal: (value: string) => void;
  isDisabled?: boolean;
}

export function NorthingEastingInput({ val, setVal, isDisabled }: Props) {

    return (
        <Input
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className={cn(
                "bg-input text-foreground",
                "focus-visible:ring-0",
                "transition-none",
            )}
            disabled={isDisabled}
        />
    );
}