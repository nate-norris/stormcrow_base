import { useAtom } from "jotai";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { QEType, QE_TYPES } from "../core/models";
import { qeTypeAtom } from "../state/derivedLoggingAtom";

export default function QETypeSelector() {
  const [qet, setQet] = useAtom(qeTypeAtom);

  return (
    <Select
      value={qet}
      onValueChange={(value) => setQet(value as QEType)}
    >
      <SelectTrigger className="w-50">
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