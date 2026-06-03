import { useState, useEffect } from "react";
import { useAtom } from "jotai";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { qeCountAtom } from "../state/derivedLoggingAtom";

export default function QECountSpinner() {
  const [value, setValue] = useAtom(qeCountAtom);
  const [input, setInput] = useState(value.toString());

  // update local state when atom changes
  useEffect(() => {
    setInput(value.toString());
  }, []);

  function commit(val: string) {
    if (val ==="") return; // check empty input

    // check positive number input
    const n = Number(val);
    // alert(n);
    if (!Number.isNaN(n) && n >= 1) {
      setValue(n);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    const val = e.target.value

    if (val === "" || /^\d+$/.test(val)) {
      setInput(val);
    }
  }

  function handleBlur() {
    commit(input);
  }

  function qeUp() {
    if (input === "") return;

    const i = (parseInt(input) + 1).toString();
    setInput(i);
    commit(i);
  }

  function qeDown() {
    if (input === "") return;
    // ensure cannot decrement below 1
    const i = (Math.max(1, parseInt(input) - 1)).toString();
    setInput(i);
    commit(i);
  }

  return (
    <div className="flex items-stretch">
      <Input
        id="count"
        type="text"
        value={input}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-20 rounded-r-none text-center h-10"
      />

      {/* vertical button group */}
      <div className="flex flex-col">
        <Button
          type="button"
          variant="outline"
          className="h-5 px-2 rounded-l-none rounded-b-none"
          onClick={qeUp}
        >
          ▲
        </Button>

        <Button
          type="button"
          variant="outline"
          className="h-5 px-2 rounded-l-none rounded-t-none border-t-0"
          onClick={qeDown}
        >
          ▼
        </Button>
      </div>
    </div>
  );
}