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
    if (!Number.isNaN(n) && n >= 1) {
      setValue(n);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    const val = e.target.value
    // allow empty or digits while typing
    if (val === "" || /^\d+$/.test(val)) {
        setInput(val);
    }
  }

  function handleBlur() {
    commit(input);
    setInput(value.toString())
  }

  function qeUp() {
    setValue(value + 1);
  }

  function qeDown() {
    // ensure cannot decrement below 1
    setValue(Math.max(1, value - 1));
  }

  return (
    <div className="flex items-stretch">
      <Input
        id="count"
        type="text"
        value={value}
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