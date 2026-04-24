import { Test } from "@/models";

type Props = {
    tests: Test[];
    selectedId: number | null;
    onChange: (id: number) => void;
}
export function TestSessionSelector({ tests, selectedId, onChange }: Props) {
    return (
        <select className="border p-2 rounded w-full"
            value={selectedId ?? ""}
            onChange={(e) => onChange(Number(e.target.value))}
        > 
            <option value="" disabled>Select a test</option>
            {tests.map((test) => (
                <option key={test.id} value={test.id}>
                    {test.name} {new Date(test.time * 1000).toLocaleString()}
                </option>
            ))}
        </select>
    );
}