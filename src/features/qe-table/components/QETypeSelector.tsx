import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { QEType, QE_TYPES } from "@/features/qe-logging/core/qe-types";

type Props = {
  val: QEType;
  setVal: (v: QEType) => void;
};

export function QETypeSelector({val, setVal}: Props) {
  return (
    <Select
      value={val}
      onValueChange={(value) => setVal(value as QEType)}
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