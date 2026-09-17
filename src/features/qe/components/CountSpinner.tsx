import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type CountSpinnerProps = {
    value: number;
    onChange: (value: number) => void;
};

/**
* Controlled QE count spinner.
*
* Provides text input and increment/decrement controls for selecting
* a positive QE count. The component maintains temporary input state
* while delegating the authoritative value to the caller through
* `value` and `onChange`.
*
* This component does not own or modify application-level QE state,
* allowing it to be used for both active QE editing and transient
* selections such as QE reassignment.
*
* @param value - The current authoritative QE count.
* @param onChange - Called when a valid QE count is committed.
*/
export function CountSpinner({ value, onChange }: CountSpinnerProps) {
  const [input, setInput] = useState(value.toString());

  // update local state when atom changes
  useEffect(() => {
    setInput(value.toString());
  }, [value]);

  function commit(val: string) {
    if (val ==="") return; // check empty input

    // check positive number input
    const n = Number(val);
    // alert(n);
    if (!Number.isNaN(n) && n >= 1) {
      onChange(n);
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

  function countUp() {
    if (input === "") return;

    const i = (parseInt(input) + 1).toString();
    setInput(i);
    commit(i);
  }

  function countDown() {
    if (input === "") return;
    // ensure cannot decrement below 1
    const i = (Math.max(1, parseInt(input) - 1)).toString();
    setInput(i);
    commit(i);
  }

  return (
    <div className="flex items-stretch">
      <Input
        id="qe-count"
        type="text"
        value={input}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-20 rounded-r-none text-center h-9 bg-input text-foreground"
      />

      {/* vertical button group */}
      <div className="flex flex-col h-9 justify-center">
        <Button
          type="button"
          variant="outline"
          className="h-4 px-2 rounded-l-none rounded-b-none bg-accent text-foreground"
          onClick={countUp}
        >
          ▲
        </Button>

        <Button
          type="button"
          variant="outline"
          className="h-4 px-2 rounded-l-none rounded-t-none border-t-0 bg-accent text-foreground"
          onClick={countDown}
        >
          ▼
        </Button>
      </div>
    </div>
  );
}
