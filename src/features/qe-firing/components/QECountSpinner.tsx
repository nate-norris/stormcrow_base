import { useAtom } from "jotai";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { qeCountAtom } from "@/state/logQEAtom";

export default function QECountSpinner() {
  const [value, setValue] = useAtom(qeCountAtom);

  function qeUp() {
    const v = parseInt(value) + 1;
    setValue(v.toString());
  }

  function qeDown() {
    // ensure cannot decrement below 1
    const v = value == "1" ? value : (parseInt(value)-1).toString()
    setValue(v);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    const val = e.target.value
    if (val == "" || /^\d+$/.test(val)) {
        setValue(val);
    }
  }

  return (
    <div className="flex items-stretch">
      <Input
        id="count"
        type="text"
        value={value}
        onChange={handleChange}
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