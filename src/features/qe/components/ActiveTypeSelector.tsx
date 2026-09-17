import { useAtom } from "jotai";

import { qeTypeAtom } from "../state/qeTypeAtom";
import { TypeSelector } from "./TypeSelector";

/**
 * Wrapper of TypeSelector component to directly update the activeQEAtom
 * through derived qeTypeAtom.
 */
export function ActiveTypeSelector() {
  const [qeType, setQeType] = useAtom(qeTypeAtom);

  return (
    <TypeSelector
      value={qeType}
      onChange={setQeType}
    />
  );
}