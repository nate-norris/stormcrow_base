import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Test } from "@/models";

type Props = {
    tests: Test[];
    selectedId: number | null;
    onChange: (id: number | null) => void;
}
export function TestSessionSelector({ tests, selectedId, onChange }: Props) {
    return (
        <Select 
            value={selectedId ? String(selectedId) : ""} 
            onValueChange={(value) => {
                onChange(value ? Number(value) : null);
            }}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a test" />
            </SelectTrigger>
            <SelectContent>
                {tests.map((test) => (
                    <SelectItem key={test.id} value={String(test.id)}>
                        {test.name} {new Date(test.time * 1000).toLocaleString()}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>

    );
}