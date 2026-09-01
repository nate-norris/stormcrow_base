import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { type QEType } from "../core/types";
import { QE_TYPES } from "../core/consts";

type TypeSelectorProps = {
    value: QEType;
    onChange: (value: QEType) => void;
};

/**
* Controlled QE type selector.
*
* Provides drop down selection of qe types. The component delegates the 
* authoritative value to the caller through `value` and `onChange`.
*
* This component does not own or modify application-level QE state,
* allowing it to be used for both active QE editing and transient
* selections such as QE reassignment.
*
* @param value - The current authoritative QE type.
* @param onChange - Called when a valid QE type is committed.
*/
export function TypeSelector({ value, onChange }: TypeSelectorProps) {

  return (
    <Select
      value={value}
      onValueChange={(value) => onChange(value as QEType)}
    >
      <SelectTrigger id="qe-type" className="w-50 bg-input text-foreground">
        <SelectValue placeholder="Select a type" />
      </SelectTrigger>

      <SelectContent>
        {Object.entries(QE_TYPES).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>

    </Select>
  );
}