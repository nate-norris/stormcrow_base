import { useAtom } from "jotai";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { qeTypeAtom } from "@/state/logQEAtom";

export default function QETypeSelector() {
  const [qet, setQet] = useAtom(qeTypeAtom);

  return (
    <Select
      value={qet}
      onValueChange={(value) => setQet(value)}
    >
      <SelectTrigger className="w-50">
        <SelectValue placeholder="Select a type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="TR">
          Test Round (TR)
        </SelectItem>
        <SelectItem value="WS">
          Warmer Spotter (WS)
        </SelectItem>
      </SelectContent>

    </Select>
  );
}