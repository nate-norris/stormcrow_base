import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils"
import { CONFIG_LIMITS } from "../core/constants";


interface Props {
    utm: number;
    setUtm: (value: number) => void;
    isDisabled?: boolean;
}

export function UtmZone({ utm, setUtm, isDisabled }: Props) {
    return (
        <Input
            type="number"
            className={cn(
                "w-30 bg-input text-foreground",
                "focus-visible:ring-0",
                "transition-none",
            )}
            min={CONFIG_LIMITS.utmZones.min}
            max={CONFIG_LIMITS.utmZones.max}
            step="1"
            value={Number.isFinite(utm) ? utm : 11}
            onChange={(e) => setUtm(Number(e.target.value))}
            disabled={isDisabled}
        />
    );
}