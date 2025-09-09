import { useState } from "react";

export default function QeCountSpinner() {
  const [value, setValue] = useState("1");

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
    <div>
        <label htmlFor="qe">QE</label>
        <input id="qe" type="text" value={value}
            onChange={handleChange}/>
        <button onClick={qeUp}>▲</button>
        <button onClick={qeDown}>▼</button>
    </div>
  );
}