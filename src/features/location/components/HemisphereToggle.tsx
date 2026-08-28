import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { Hemisphere } from "../core/models";

interface Props {
  val: Hemisphere;
  setVal: (value: Hemisphere) => void;
  isDisabled?: boolean;
}

export function HemisphereToggle({ val, setVal, isDisabled }: Props) {
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      value={val}
      onValueChange={(value) => {
          if (value === "N" || value === "S") {
              setVal(value);
          }
      }}
      disabled={isDisabled}
    >
      <ToggleGroupItem className=" w-15" value="N" aria-label="North">
        N
      </ToggleGroupItem>

      <ToggleGroupItem className=" w-15" value="S" aria-label="South">
        S
      </ToggleGroupItem>
    </ToggleGroup>
  );
}