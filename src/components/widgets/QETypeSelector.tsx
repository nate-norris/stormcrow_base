import { useState } from "react";

export default function QETypeSelector() {
  const [qet, setQet] = useState("");

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
