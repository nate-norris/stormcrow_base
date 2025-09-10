import { useAtom } from "jotai";
import { qeTypeAtom } from "@/atoms/logQEAtom";

export default function QETypeSelector() {
  const [qet, setQet] = useAtom(qeTypeAtom);

  return (
    <>
      <select
        value={qet}                 // controlled via state
        onChange={(e) => setQet(e.target.value)}
      >
        <option value="TR">Test Round (TR)</option>
        <option value="WS">Warmer Spotter (WS)</option>
      </select>
    </>
  );
}
